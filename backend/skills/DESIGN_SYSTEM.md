# IntelliOpsApp Design System

> Comprehensive design documentation for recreating the IntelliOps application in Figma

---

## Table of Contents
1. [Overview](#overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Elevation & Shadows](#elevation--shadows)
6. [Border System](#border-system)
7. [Icons](#icons)
8. [Components](#components)
9. [Layout Components](#layout-components)
10. [Animations](#animations)
11. [Responsive Breakpoints](#responsive-breakpoints)

---

## Overview

**Design Principles:**
- Material Design 8px grid system
- Dark mode first (with full light mode support)
- WCAG AA accessibility compliance
- Elevation-based depth hierarchy
- Enterprise-grade component library

**Tech Stack:**
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- Class Variance Authority (CVA)

---

## Color System

### Brand Colors

#### Primary (Purple/Blue)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| primary-50 | `#eef2ff` | `#eef2ff` | Subtle backgrounds |
| primary-100 | `#e0e7ff` | `#e0e7ff` | Hover backgrounds |
| primary-200 | `#c7d2fe` | `#c7d2fe` | Light accents |
| primary-300 | `#a5b4fc` | `#a5b4fc` | Medium accents |
| primary-400 | `#818cf8` | `#818cf8` | Active states |
| **primary-500** | `#5153f6` | `#5153f6` | **Base primary** |
| primary-600 | `#3f42d4` | `#3f42d4` | Hover states |
| primary-700 | `#343bb3` | `#343bb3` | Pressed states |
| primary-800 | `#2e3491` | `#2e3491` | Deep accents |
| primary-900 | `#1e1b4b` | `#1e1b4b` | Darkest shade |

#### Secondary (Pink/Magenta)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| secondary-50 | `#fef8fe` | `#fef8fe` | Subtle backgrounds |
| secondary-100 | `#fef0fe` | `#fef0fe` | Hover backgrounds |
| secondary-200 | `#fddafc` | `#fddafc` | Light accents |
| secondary-300 | `#f9baf8` | `#f9baf8` | Medium accents |
| secondary-400 | `#f49af8` | `#f49af8` | Active states |
| **secondary-500** | `#ec86fa` | `#ec86fa` | **Base secondary** |
| secondary-600 | `#b765d9` | `#b765d9` | Hover states |
| secondary-700 | `#914bb1` | `#914bb1` | Pressed states |
| secondary-800 | `#6c3a87` | `#6c3a87` | Deep accents |
| secondary-900 | `#2f1a31` | `#2f1a31` | Darkest shade |

### Semantic Colors

#### Success (Green)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| success-bg | `#22c55e` | `#22c55e` |
| success-bg-subtle | `rgba(34, 197, 94, 0.1)` | `rgba(34, 197, 94, 0.15)` |
| success-border | `rgba(34, 197, 94, 0.3)` | `rgba(34, 197, 94, 0.4)` |
| success-text | `#16a34a` | `#4ade80` |
| success-text-strong | `#166534` | `#22c55e` |

#### Warning (Amber)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| warning-bg | `#f59e0b` | `#f59e0b` |
| warning-bg-subtle | `rgba(245, 158, 11, 0.1)` | `rgba(245, 158, 11, 0.15)` |
| warning-border | `rgba(245, 158, 11, 0.3)` | `rgba(245, 158, 11, 0.4)` |
| warning-text | `#d97706` | `#fbbf24` |
| warning-text-strong | `#92400e` | `#f59e0b` |

#### Error (Red)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| error-bg | `#f46969` | `#f46969` |
| error-bg-subtle | `rgba(244, 105, 105, 0.1)` | `rgba(244, 105, 105, 0.15)` |
| error-border | `rgba(244, 105, 105, 0.3)` | `rgba(244, 105, 105, 0.4)` |
| error-text | `#dc2626` | `#f87171` |
| error-text-strong | `#991b1b` | `#ef4444` |

#### Info (Blue)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| info-bg | `#3b82f6` | `#3b82f6` |
| info-bg-subtle | `rgba(59, 130, 246, 0.1)` | `rgba(59, 130, 246, 0.15)` |
| info-border | `rgba(59, 130, 246, 0.3)` | `rgba(59, 130, 246, 0.4)` |
| info-text | `#2563eb` | `#60a5fa` |
| info-text-strong | `#1e40af` | `#3b82f6` |

### Surface Elevation

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| elevation-0 | `#f8fafc` | `#171d2c` | Base canvas |
| elevation-1 | `#ffffff` | `#1c2538` | Cards, sidebar |
| elevation-2 | `#ffffff` | `#212c40` | Panels, modals |
| elevation-3 | `#ffffff` | `#283346` | Dropdowns |
| elevation-4 | `#ffffff` | `#313949` | Tooltips |

### Text Hierarchy

| Token | Light Mode | Dark Mode | Contrast | Usage |
|-------|------------|-----------|----------|-------|
| text-primary | `#0f172a` | `#f8fafc` | 15:1 / 12:1 | Main content |
| text-secondary | `#475569` | `#94a3b8` | 7:1 | Secondary info |
| text-tertiary | `#64748b` | `#64748b` | 4.5:1 | Hints, labels |
| text-disabled | `#94a3b8` | `#475569` | 3:1 | Disabled text |
| text-inverse | `#f8fafc` | `#0f172a` | — | On colored bg |

### Border Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| border-subtle | `rgba(226, 232, 240, 0.6)` | `rgba(51, 65, 85, 0.6)` | Barely visible |
| border-default | `#e2e8f0` | `#334155` | Standard borders |
| border-strong | `#cbd5e1` | `#475569` | Emphasis |
| border-interactive | primary-500 | primary-400 | Interactive elements |
| border-hover | `#94a3b8` | `#64748b` | Hover states |

### Node Type Colors (Flow Diagrams)

| Node Type | Base Color | Hex |
|-----------|------------|-----|
| Application | Deep Blue | `#0078d4` |
| Repository | Purple | `#8764b8` |
| Pipeline | Amber | `#d97706` |
| Service | Cyan/Teal | `#008272` |
| Connector | Orange | `#ff8c00` |

---

## Typography

### Font Family
```
Primary: "Universal Sans"
Fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

### Font Weights
| Weight | Name | CSS Value |
|--------|------|-----------|
| 300 | Light | `font-light` |
| 400 | Normal | `font-normal` |
| 500 | Medium | `font-medium` |
| 550 | Medium-Bold | — |
| 600 | Semi-bold | `font-semibold` |
| 700 | Bold | `font-bold` |

### Type Scale

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| xs | 12px | 16px (1.33) | Helper text, badges |
| sm | 14px | 20px (1.43) | Body small, labels |
| base | 16px | 24px (1.5) | Body text |
| lg | 18px | 28px (1.55) | Section titles |
| xl | 20px | 28px (1.4) | Headings |
| 2xl | 24px | 32px (1.33) | Page titles |
| 3xl | 30px | 36px (1.2) | Large titles |
| 4xl | 36px | 40px (1.11) | Display |
| 5xl | 48px | 48px (1) | Hero |
| 6xl | 60px | 60px (1) | Display large |
| 7xl | 72px | 72px (1) | Display XL |

### Font Features
- OpenType features: `"liga" 1, "calt" 1`
- Font smoothing: antialiased
- Font display: swap

---

## Spacing & Layout

### Base Unit
**8px Material Design grid system**

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| 0.5 | 2px | Hairline gaps |
| 1 | 4px | Tight spacing |
| 1.5 | 6px | Small gaps |
| 2 | 8px | Component padding |
| 2.5 | 10px | — |
| 3 | 12px | Medium padding |
| 3.5 | 14px | — |
| 4 | 16px | Standard padding |
| 5 | 20px | — |
| 6 | 24px | Section padding |
| 7 | 28px | — |
| 8 | 32px | Large padding |
| 9 | 36px | — |
| 10 | 40px | XL padding |
| 11 | 44px | — |
| 12 | 48px | — |
| 14 | 56px | — |
| 16 | 64px | — |
| 20 | 80px | — |
| 24 | 96px | — |

### Common Patterns
- Component internal padding: `p-4` (16px)
- Card padding: `p-6` (24px)
- Section gaps: `gap-6` (24px)
- Form field spacing: `space-y-4` (16px)
- Button padding: `px-4` (16px horizontal)

### Container
- Max width: 1400px (2xl)
- Padding: 16px default → 64px at 2xl
- Centered: `mx-auto`

---

## Elevation & Shadows

### Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| shadow | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Default |
| shadow-md | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | Cards |
| shadow-lg | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Dropdowns |
| shadow-xl | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | Modals |
| shadow-2xl | `0 25px 50px rgba(0,0,0,0.25)` | Popovers |

### Elevation Shadows

| Level | Light Mode | Dark Mode |
|-------|------------|-----------|
| elevation-1 | `0 1px 3px rgba(15,23,42,0.08)` | `0 1px 3px rgba(0,0,0,0.4)` |
| elevation-2 | `0 4px 6px rgba(15,23,42,0.1)` | `0 4px 6px rgba(0,0,0,0.5)` |
| elevation-3 | `0 10px 20px rgba(15,23,42,0.12)` | `0 10px 20px rgba(0,0,0,0.6)` |
| elevation-4 | `0 15px 25px rgba(15,23,42,0.15)` | `0 15px 25px rgba(0,0,0,0.65)` |
| elevation-5 | `0 25px 50px rgba(15,23,42,0.2)` | `0 25px 50px rgba(0,0,0,0.7)` |

---

## Border System

### Border Width

| Token | Value | Usage |
|-------|-------|-------|
| border-0.5 | 0.5px | Hairline borders |
| border | 1px | Default |
| border-1.5 | 1.5px | Slight emphasis |
| border-2 | 2px | Strong emphasis |
| border-3 | 3px | Heavy |
| border-4 | 4px | Very heavy |
| border-8 | 8px | Decorative |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| rounded-sm | 4px | Small elements |
| rounded-md | 6px | Inputs |
| rounded-lg | 12px | Buttons, cards |
| rounded-xl | 16px | Large cards |
| rounded-2xl | 16px | — |
| rounded-3xl | 24px | Large containers |
| rounded-full | 9999px | Pills, avatars |

---

## Icons

### Library
**Lucide React** v0.323.0

### Icon Sizes

| Context | Size | Tailwind |
|---------|------|----------|
| XS Button | 14px | `size-3.5` |
| SM Button | 16px | `size-4` |
| Default Button | 16px | `size-4` |
| LG Button | 18px | `size-4.5` |
| XL Button | 20px | `size-5` |

### Common Icons

| Icon | Usage |
|------|-------|
| `Layers` | Feature |
| `Box` | Sub-feature |
| `Package` | Product |
| `ChevronRight` | Navigation, expand |
| `ChevronDown` | Collapse, dropdown |
| `Plus` | Add action |
| `X` | Close, remove |
| `Sparkles` | AI features |
| `CheckCircle2` | Success, selected |
| `AlertCircle` | Warning, error |
| `Info` | Information |
| `Sun` | Light mode |
| `Moon` | Dark mode |
| `Link2` | Links, connections |
| `ExternalLink` | External links |
| `Search` | Search |
| `Settings` | Settings |
| `User` | User, profile |
| `LogOut` | Logout |

---

## Components

### Button

#### Sizes
| Size | Height | Padding | Font | Icon |
|------|--------|---------|------|------|
| xs | 28px | px-2 | 12px | 14px |
| sm | 32px | px-3 | 12px | 16px |
| default | 36px | px-4 | 14px | 16px |
| lg | 40px | px-5 | 14px | 18px |
| xl | 44px | px-6 | 16px | 20px |
| xxl | 48px | px-7 | 16px | 20px |

#### Variants
| Variant | Background | Text | Border |
|---------|------------|------|--------|
| default | Gradient (primary-500 → blue-600) | White | None |
| secondary | elevation-2 | text-secondary | border-subtle |
| outline | Transparent | text-secondary | border-default |
| ghost | Transparent | text-secondary | None |
| destructive | Gradient (red-500 → rose-600) | White | None |
| link | Transparent | primary-500 | None (underline) |
| info | Gradient (blue-500 → cyan-500) | White | None |
| success | Gradient (green-500 → emerald-500) | White | None |
| warning | Gradient (amber-500 → orange-500) | White | None |
| ai-action | elevation-2 | secondary-400 | secondary-300 |

#### States
- **Hover**: Elevation increase, slight color shift
- **Active/Pressed**: Scale down slightly
- **Focus**: 2px ring (primary-500), 2px offset
- **Disabled**: 50% opacity, no pointer events
- **Loading**: Spinner icon, disabled state

### Input

| Property | Value |
|----------|-------|
| Height | 36px (h-9) |
| Border | 1px border-default |
| Border Radius | 6px (rounded-md) |
| Padding | 12px horizontal |
| Background | elevation-1 |
| Focus | primary-500 ring |

### Textarea

| Property | Value |
|----------|-------|
| Min Height | 80px |
| Border | 1px border-default |
| Border Radius | 6px (rounded-md) |
| Padding | 12px |
| Background | elevation-1 |
| Resize | Vertical |

### Badge

| Variant | Background | Text |
|---------|------------|------|
| default | primary-100 | primary-700 |
| secondary | secondary-100 | secondary-700 |
| success | success-bg-subtle | success-text |
| warning | warning-bg-subtle | warning-text |
| error | error-bg-subtle | error-text |
| info | info-bg-subtle | info-text |
| outline | Transparent | text-secondary |

### Card

| Property | Value |
|----------|-------|
| Background | elevation-1 |
| Border | 0.5px border-subtle |
| Border Radius | 12px (rounded-lg) |
| Shadow | elevation-sm |
| Padding | 24px (p-6) |

### Dialog/Modal

| Property | Value |
|----------|-------|
| Background | elevation-2 |
| Border Radius | 16px (rounded-xl) |
| Shadow | elevation-5 |
| Overlay | Black 80% opacity |
| Max Width | 425px (default) |
| Padding | 24px |

---

## Layout Components

### ContentLayout

Main page layout with optional right panel.

```
┌─────────────────────────────────────────────────────┐
│ Header (bg-elevation-2, border-b, shadow-sm)        │
│ ┌─────────────────────────────────────────────────┐ │
│ │ [Icon] Title                        [Actions]   │ │
│ │        Subtitle                                 │ │
│ └─────────────────────────────────────────────────┘ │
├──────────────────────────────┬──────────────────────┤
│                              │ Panel (optional)     │
│ Main Content Area            │ ┌──────────────────┐ │
│ (flex-1, overflow-auto)      │ │ Panel Header     │ │
│                              │ ├──────────────────┤ │
│                              │ │ Panel Content    │ │
│                              │ │ (scrollable)     │ │
│                              │ ├──────────────────┤ │
│                              │ │ Panel Footer     │ │
│                              │ │ (sticky)         │ │
│                              │ └──────────────────┘ │
└──────────────────────────────┴──────────────────────┘
```

**Panel Widths:**
- sm: 256px (w-64)
- md: 320px (w-80)
- lg: 384px (w-96)
- xl: 512px (w-[32rem])
- 50%: 50vw (w-1/2)

### DashboardLayout

Grid-based dashboard structure.

```
┌─────────────────────────────────────────────────────┐
│ Overall Stats (3 columns)                           │
│ ┌───────────┬───────────┬───────────┐              │
│ │ Stat 1    │ Stat 2    │ Stat 3    │              │
│ └───────────┴───────────┴───────────┘              │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┬───────────────────┐ │
│ │ Detailed Stats (3 cols)    │ Priority Items    │ │
│ │ ┌─────┬─────┬─────┐        │ ┌───────────────┐ │ │
│ │ │     │     │     │        │ │               │ │ │
│ │ └─────┴─────┴─────┘        │ │               │ │ │
│ ├─────────────────────────────┤ │               │ │ │
│ │ Trends Section              │ │               │ │ │
│ │                             │ │               │ │ │
│ │                             │ │               │ │ │
│ └─────────────────────────────┴───────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Panel Structure

```
┌────────────────────────────────────┐
│ Panel Header                       │
│ bg-elevation-2                     │
│ border-b-0.5 border-subtle         │
│ shadow-elevation-sm                │
│ p-6                                │
├────────────────────────────────────┤
│ Panel Content                      │
│ overflow-y-auto                    │
│ p-6 pb-24                          │
│ space-y-6                          │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Form Field                     │ │
│ │ ┌────────────────────────────┐ │ │
│ │ │ Label (text-sm font-medium)│ │ │
│ │ └────────────────────────────┘ │ │
│ │ ┌────────────────────────────┐ │ │
│ │ │ Input                      │ │ │
│ │ └────────────────────────────┘ │ │
│ └────────────────────────────────┘ │
│                                    │
├────────────────────────────────────┤
│ Panel Footer (sticky)              │
│ bg-elevation-2                     │
│ border-t border-subtle             │
│ px-6 py-4                          │
│ shadow-elevation-sm                │
│ ┌────────────────────────────────┐ │
│ │ [Cancel]           [Save]      │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

---

## Animations

### Keyframe Animations

| Name | Duration | Effect |
|------|----------|--------|
| accordion-down | 200ms | Height 0 → auto |
| accordion-up | 200ms | Height auto → 0 |
| fade-in | 150ms | Opacity 0 → 1 |
| fade-out | 150ms | Opacity 1 → 0 |
| slide-in-right | 200ms | translateX(100%) → 0 |
| slide-out-right | 200ms | translateX(0) → 100% |
| scale-in | 150ms | Scale 0.95 → 1 |
| scale-out | 150ms | Scale 1 → 0.95 |
| pulse | 2s infinite | Opacity 1 → 0.5 → 1 |
| shimmer | 2s infinite | Background position shift |

### Timing Functions

| Name | Value | Usage |
|------|-------|-------|
| standard | `cubic-bezier(0.4, 0, 0.2, 1)` | Most transitions |
| decelerate | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations |
| accelerate | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |

### Transition Durations

| Name | Duration |
|------|----------|
| fast | 150ms |
| base | 200ms |
| slow | 300ms |
| slower | 500ms |

---

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| (default) | 0 | Mobile |
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1400px | Large screens |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| z-0 | 0 | Base |
| z-10 | 10 | Slight raise |
| z-20 | 20 | Cards |
| z-30 | 30 | — |
| z-40 | 40 | — |
| z-50 | 50 | Headers |
| z-dropdown | 1000 | Dropdowns |
| z-sticky | 1100 | Sticky elements |
| z-fixed | 1200 | Fixed elements |
| z-modal | 1300 | Modals |
| z-popover | 1400 | Popovers |
| z-tooltip | 1500 | Tooltips |

---

## Quick Reference

### Common Component Patterns

**Form Field:**
```
Label: text-sm font-medium text-foreground mb-2
Input: h-9 rounded-md border-default bg-elevation-1 px-3
Helper: text-xs text-text-secondary mt-1
```

**Card:**
```
Container: bg-elevation-1 rounded-lg border-0.5 border-subtle shadow-elevation-sm p-6
Title: text-lg font-semibold text-foreground
Description: text-sm text-text-secondary
```

**Section:**
```
Container: space-y-6
Header: flex items-center justify-between mb-4
Title: text-xl font-semibold
Action: Button size="sm"
```

**List Item:**
```
Container: flex items-center gap-3 p-4 rounded-lg hover:bg-elevation-1
Icon: size-5 text-text-secondary
Text: flex-1
Meta: text-sm text-text-tertiary
```

---

## File References

| Resource | Path |
|----------|------|
| Tailwind Config | `app/tailwind.config.js` |
| Light Tokens | `app/src/styles/light-tokens.css` |
| Dark Tokens | `app/src/styles/dark-tokens.css` |
| Fonts | `app/src/styles/fonts.css` |
| UI Components | `app/src/components/ui/` |
| Layout Components | `app/src/layouts/` |
| Button Variants | `app/src/components/ui/button.tsx` |
| CN Utility | `app/src/utils/cn-utils.ts` |

---

*Generated for Figma design recreation*
