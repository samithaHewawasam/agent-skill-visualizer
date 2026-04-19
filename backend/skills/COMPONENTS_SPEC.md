# IntelliOps UI Components Specification

> Component specifications for recreating UI components in Figma

---

## Table of Contents
1. [Button](#button)
2. [Input](#input)
3. [Textarea](#textarea)
4. [Checkbox](#checkbox)
5. [Switch](#switch)
6. [Select](#select)
7. [Badge](#badge)
8. [Card](#card)
9. [Dialog/Modal](#dialogmodal)
10. [Dropdown Menu](#dropdown-menu)
11. [Accordion](#accordion)
12. [Alert](#alert)
13. [Progress](#progress)
14. [Tabs](#tabs)
15. [Form Field](#form-field)
16. [Panel](#panel)
17. [Navigation List](#navigation-list)
18. [Status Badge](#status-badge)

---

## Button

### Anatomy
```
┌─────────────────────────────────┐
│  [Icon]  Label Text  [Icon]    │
└─────────────────────────────────┘
     ↑          ↑          ↑
  Leading    Label     Trailing
   Icon                  Icon
```

### Size Variants

| Size | Height | Padding X | Font Size | Icon Size | Border Radius |
|------|--------|-----------|-----------|-----------|---------------|
| xs | 28px | 8px | 12px | 14px | 12px |
| sm | 32px | 12px | 12px | 16px | 12px |
| default | 36px | 16px | 14px | 16px | 12px |
| lg | 40px | 20px | 14px | 18px | 12px |
| xl | 44px | 24px | 16px | 20px | 12px |
| xxl | 48px | 28px | 16px | 20px | 12px |

### Icon-Only Sizes

| Size | Dimensions |
|------|------------|
| icon-xs | 28×28px |
| icon-sm | 32×32px |
| icon | 36×36px |
| icon-lg | 40×40px |
| icon-xl | 44×44px |

### Style Variants

#### Default (Primary)
```
Background: Linear gradient 135° from #5153f6 to #3b82f6
Text: #ffffff
Border: none
Shadow: 0 1px 2px rgba(0,0,0,0.05)

Hover:
  Background: Linear gradient 135° from #3f42d4 to #2563eb
  Shadow: 0 4px 6px rgba(0,0,0,0.1)

Active:
  Transform: scale(0.98)

Focus:
  Ring: 2px #5153f6, offset 2px

Disabled:
  Opacity: 50%
  Pointer-events: none
```

#### Secondary
```
Background: elevation-2 (#ffffff light / #212c40 dark)
Text: text-secondary (#475569 light / #94a3b8 dark)
Border: 1px border-subtle

Hover:
  Background: elevation-1
  Border: border-default
```

#### Outline
```
Background: transparent
Text: text-secondary
Border: 1px border-default

Hover:
  Background: elevation-1
  Border: primary-500
```

#### Ghost
```
Background: transparent
Text: text-secondary
Border: none

Hover:
  Background: elevation-1
```

#### Destructive
```
Background: Linear gradient 135° from #ef4444 to #f43f5e
Text: #ffffff

Hover:
  Background: Linear gradient 135° from #dc2626 to #e11d48
```

#### Link
```
Background: transparent
Text: primary-500 (#5153f6)
Border: none
Text-decoration: underline on hover
```

#### Info
```
Background: Linear gradient 135° from #3b82f6 to #06b6d4
Text: #ffffff
```

#### Success
```
Background: Linear gradient 135° from #22c55e to #10b981
Text: #ffffff
```

#### Warning
```
Background: Linear gradient 135° from #f59e0b to #f97316
Text: #ffffff
```

#### AI Action
```
Background: elevation-2
Text: secondary-400 (#f49af8)
Border: 1px secondary-300 (#f9baf8)

Hover:
  Background: secondary-500/10
```

### States Layer

| State | Visual Change |
|-------|---------------|
| Default | Base styling |
| Hover | Darken bg, increase shadow |
| Active/Pressed | Scale to 98% |
| Focus | 2px ring (primary-500), 2px offset |
| Disabled | 50% opacity |
| Loading | Show spinner, disable interaction |

---

## Input

### Anatomy
```
┌─────────────────────────────────────┐
│ [Icon]  Placeholder text    [Icon] │
└─────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Height | 36px |
| Padding X | 12px |
| Padding Y | 8px |
| Border Radius | 6px |
| Border Width | 1px |
| Font Size | 14px |
| Line Height | 20px |

### Colors

| State | Background | Border | Text | Placeholder |
|-------|------------|--------|------|-------------|
| Default | elevation-1 | border-default | text-primary | text-tertiary |
| Hover | elevation-1 | border-hover | text-primary | text-tertiary |
| Focus | elevation-1 | primary-500 | text-primary | text-tertiary |
| Disabled | elevation-0 | border-subtle | text-disabled | text-disabled |
| Error | elevation-1 | error-bg | text-primary | text-tertiary |

### Focus State
```
Border: 1px primary-500
Ring: 2px primary-500/20
```

### With Icons
```
Left Icon: padding-left 40px, icon at 12px from left
Right Icon: padding-right 40px, icon at 12px from right
Icon Size: 16px
Icon Color: text-tertiary (primary-500 on focus)
```

---

## Textarea

### Specifications

| Property | Value |
|----------|-------|
| Min Height | 80px |
| Padding | 12px |
| Border Radius | 6px |
| Border Width | 1px |
| Font Size | 14px |
| Line Height | 20px |
| Resize | Vertical |

### Colors
Same as Input component

---

## Checkbox

### Anatomy
```
┌────┐
│ ✓  │  Label text
└────┘
  ↑
 Box (16×16)
```

### Specifications

| Property | Value |
|----------|-------|
| Box Size | 16×16px |
| Border Radius | 4px |
| Border Width | 1px |
| Gap (box to label) | 8px |
| Label Font Size | 14px |

### States

| State | Background | Border | Check Color |
|-------|------------|--------|-------------|
| Unchecked | transparent | border-default | — |
| Unchecked Hover | elevation-1 | border-hover | — |
| Checked | primary-500 | primary-500 | #ffffff |
| Checked Hover | primary-600 | primary-600 | #ffffff |
| Disabled | elevation-0 | border-subtle | text-disabled |
| Indeterminate | primary-500 | primary-500 | #ffffff (dash) |

### Check Icon
```
SVG checkmark, 12×12px, stroke-width 2px
```

---

## Switch

### Anatomy
```
┌──────────────┐
│  ●           │  OFF
└──────────────┘

┌──────────────┐
│           ●  │  ON
└──────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Track Width | 44px |
| Track Height | 24px |
| Track Radius | 12px (full) |
| Thumb Size | 20px |
| Thumb Radius | 10px (full) |
| Thumb Offset | 2px from edge |

### States

| State | Track BG | Thumb BG | Thumb Position |
|-------|----------|----------|----------------|
| Off | neutral-200 | #ffffff | Left (2px) |
| Off Hover | neutral-300 | #ffffff | Left |
| On | primary-500 | #ffffff | Right (22px) |
| On Hover | primary-600 | #ffffff | Right |
| Disabled Off | neutral-100 | neutral-300 | Left |
| Disabled On | primary-300 | #ffffff | Right |

### Animation
```
Thumb transition: transform 200ms ease
Track transition: background 200ms ease
```

---

## Select

### Trigger Anatomy
```
┌─────────────────────────────────────┐
│  Selected value              ▼     │
└─────────────────────────────────────┘
```

### Trigger Specifications

| Property | Value |
|----------|-------|
| Height | 36px |
| Padding X | 12px |
| Border Radius | 6px |
| Border Width | 1px |
| Font Size | 14px |
| Chevron Size | 16px |

### Dropdown Content
```
Background: elevation-3
Border: 1px border-subtle
Border Radius: 8px
Shadow: elevation-lg
Padding: 4px
Max Height: 300px (scrollable)
```

### Option Item
```
Height: 32px
Padding X: 8px
Border Radius: 4px
Font Size: 14px

Hover: bg elevation-1
Selected: bg primary-500/10, text primary-500
Check icon: 16px, right side
```

---

## Badge

### Anatomy
```
┌─────────────────┐
│  Badge Text     │
└─────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Height | 20px (auto) |
| Padding X | 10px |
| Padding Y | 2px |
| Border Radius | 9999px (full) |
| Font Size | 12px |
| Font Weight | 500 (medium) |

### Variants

| Variant | Background | Text |
|---------|------------|------|
| Default | primary-100 | primary-700 |
| Secondary | secondary-100 | secondary-700 |
| Success | success-bg-subtle | success-text |
| Warning | warning-bg-subtle | warning-text |
| Error | error-bg-subtle | error-text |
| Info | info-bg-subtle | info-text |
| Outline | transparent | text-secondary, 1px border |

---

## Card

### Anatomy
```
┌─────────────────────────────────────┐
│  Card Header (optional)             │
├─────────────────────────────────────┤
│                                     │
│  Card Content                       │
│                                     │
├─────────────────────────────────────┤
│  Card Footer (optional)             │
└─────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Background | elevation-1 |
| Border | 0.5px border-subtle |
| Border Radius | 12px |
| Shadow | elevation-sm |
| Padding | 24px |

### Header
```
Padding Bottom: 16px
Border Bottom: 0.5px border-subtle (if content follows)
Title: text-lg, font-semibold, text-primary
Description: text-sm, text-secondary, margin-top 4px
```

### Footer
```
Padding Top: 16px
Border Top: 0.5px border-subtle
Flex: justify-end, gap 12px
```

### Hover State (Interactive Card)
```
Shadow: elevation-md
Border: border-default
Cursor: pointer
```

---

## Dialog/Modal

### Anatomy
```
┌─────────────────────────────────────────┐
│  ✕                                      │  Close button
├─────────────────────────────────────────┤
│  Dialog Title                           │
│  Dialog description text                │
├─────────────────────────────────────────┤
│                                         │
│  Dialog Content                         │
│                                         │
├─────────────────────────────────────────┤
│              [Cancel]  [Confirm]        │
└─────────────────────────────────────────┘
```

### Overlay
```
Background: #000000 / 80% opacity
Backdrop blur: 4px (optional)
```

### Dialog Container
```
Background: elevation-2
Border Radius: 16px
Shadow: elevation-5
Max Width: 425px (default), 600px (lg), 800px (xl)
Max Height: 85vh
Margin: auto (centered)
```

### Spacing

| Section | Padding |
|---------|---------|
| Header | 24px 24px 16px |
| Content | 0 24px |
| Footer | 16px 24px 24px |

### Close Button
```
Position: absolute, top 16px, right 16px
Size: 32×32px (icon-sm button)
Icon: X, 16px
```

### Animation
```
Enter: fade-in 150ms, scale from 95% to 100%
Exit: fade-out 150ms, scale from 100% to 95%
```

---

## Dropdown Menu

### Trigger
Same as Button component

### Content Container
```
Background: elevation-3
Border: 1px border-subtle
Border Radius: 8px
Shadow: elevation-lg
Padding: 4px
Min Width: 160px
```

### Menu Item
```
Height: 32px
Padding: 8px 8px 8px 32px (with icon space)
Border Radius: 4px
Font Size: 14px
Gap: 8px

Default: text-primary
Hover: bg elevation-1
Disabled: text-disabled, no hover
Destructive: text-error
```

### With Icons/Shortcuts
```
Leading Icon: 16px, positioned left
Trailing Shortcut: text-xs, text-tertiary, right aligned
Submenu Arrow: ChevronRight 12px, right
```

### Separator
```
Height: 1px
Background: border-subtle
Margin: 4px 0
```

### Group Label
```
Padding: 8px
Font Size: 12px
Font Weight: 600
Color: text-tertiary
Text Transform: uppercase
```

---

## Accordion

### Anatomy
```
┌─────────────────────────────────────┐
│  Accordion Title                 ▼  │  Trigger (collapsed)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Accordion Title                 ▲  │  Trigger (expanded)
├─────────────────────────────────────┤
│  Accordion content goes here.       │  Content
│  Can contain any elements.          │
└─────────────────────────────────────┘
```

### Trigger
```
Padding: 16px
Background: transparent
Border Bottom: 1px border-subtle
Font Size: 14px
Font Weight: 500

Hover: bg elevation-1
```

### Chevron Icon
```
Size: 16px
Rotation: 0° (collapsed) → 180° (expanded)
Transition: transform 200ms
```

### Content
```
Padding: 16px
Background: transparent
Animation: accordion-down 200ms (expand)
           accordion-up 200ms (collapse)
```

---

## Alert

### Anatomy
```
┌─────────────────────────────────────────┐
│  [Icon]  Alert Title              [✕]  │
│          Alert description text         │
└─────────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Padding | 16px |
| Border Radius | 8px |
| Border Width | 1px |
| Icon Size | 16px |
| Gap | 12px |

### Variants

| Variant | Background | Border | Icon/Title Color |
|---------|------------|--------|------------------|
| Default | elevation-1 | border-default | text-primary |
| Info | info-bg-subtle | info-border | info-text |
| Success | success-bg-subtle | success-border | success-text |
| Warning | warning-bg-subtle | warning-border | warning-text |
| Error | error-bg-subtle | error-border | error-text |

### Typography
```
Title: 14px, font-medium
Description: 14px, text-secondary, margin-top 4px
```

---

## Progress

### Linear Progress

```
┌─────────────────────────────────────┐
│████████████░░░░░░░░░░░░░░░░░░░░░░░░│  60%
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Track Height | 8px |
| Track Radius | 4px (full) |
| Track BG | neutral-200 |
| Fill BG | primary-500 |
| Fill Radius | 4px (full) |

### Circular Progress (optional)
```
Size: 40px
Stroke Width: 4px
Track: neutral-200
Fill: primary-500
```

---

## Tabs

### Anatomy
```
┌─────────┬─────────┬─────────┐
│  Tab 1  │  Tab 2  │  Tab 3  │
└─────────┴─────────┴─────────┘
┌─────────────────────────────┐
│  Tab Content                │
└─────────────────────────────┘
```

### Tab List
```
Background: elevation-1
Border Radius: 8px
Padding: 4px
Gap: 4px
```

### Tab Trigger
```
Height: 32px
Padding X: 12px
Border Radius: 6px
Font Size: 14px
Font Weight: 500

Default: text-secondary, bg transparent
Hover: text-primary, bg elevation-0
Active: text-primary, bg elevation-2, shadow-sm
```

### Tab Content
```
Padding Top: 16px
```

---

## Form Field

### Anatomy
```
Label *
┌─────────────────────────────────────┐
│  Input                              │
└─────────────────────────────────────┘
Helper text or error message
```

### Label
```
Font Size: 14px
Font Weight: 500
Color: text-primary
Margin Bottom: 8px

Required Asterisk: text-error, margin-left 2px
Optional Text: text-xs, text-secondary, font-normal, margin-left 8px
```

### Helper Text
```
Font Size: 12px
Color: text-tertiary
Margin Top: 6px
```

### Error Message
```
Font Size: 12px
Color: error-text
Margin Top: 6px
Icon: AlertCircle 12px (optional)
```

---

## Panel

### Anatomy
```
┌────────────────────────────────────┐
│  Panel Header                      │
│  ┌────────────────────────────────┐│
│  │ Title                     [✕] ││
│  │ Subtitle (optional)           ││
│  └────────────────────────────────┘│
├────────────────────────────────────┤
│  Panel Content (scrollable)        │
│  ┌────────────────────────────────┐│
│  │                                ││
│  │  Content goes here             ││
│  │                                ││
│  └────────────────────────────────┘│
├────────────────────────────────────┤
│  Panel Footer (sticky)             │
│  ┌────────────────────────────────┐│
│  │     [Cancel]    [Save]        ││
│  └────────────────────────────────┘│
└────────────────────────────────────┘
```

### Container
```
Background: elevation-2
Border Left: 0.5px border-subtle
Shadow: elevation-lg
Width: 320px (md) | 384px (lg) | 512px (xl)
Height: 100%
```

### Header
```
Padding: 24px
Background: elevation-2
Border Bottom: 0.5px border-subtle
Shadow: elevation-sm

Title: text-lg, font-semibold
Subtitle: text-sm, text-secondary
Close: icon button, absolute right
```

### Content
```
Padding: 24px
Padding Bottom: 96px (space for footer)
Overflow Y: auto
```

### Footer
```
Position: sticky bottom
Padding: 16px 24px
Background: elevation-2
Border Top: 1px border-subtle
Shadow: elevation-sm (inverted)

Buttons: flex, justify-end, gap 12px
```

---

## Navigation List

### Anatomy
```
┌─────────────────────────────────────┐
│  [Icon]  Nav Item Label        [→] │
├─────────────────────────────────────┤
│  [Icon]  Nav Item Label (active)   │
├─────────────────────────────────────┤
│  [Icon]  Nav Item Label            │
└─────────────────────────────────────┘
```

### Item Specifications

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding X | 12px |
| Border Radius | 8px |
| Gap | 12px |
| Icon Size | 20px |
| Font Size | 14px |
| Font Weight | 500 |

### States

| State | Background | Text | Icon |
|-------|------------|------|------|
| Default | transparent | text-secondary | text-tertiary |
| Hover | elevation-1 | text-primary | text-secondary |
| Active | primary-500/10 | primary-500 | primary-500 |
| Disabled | transparent | text-disabled | text-disabled |

### With Badge
```
Badge: positioned right
Padding Right: 8px (before badge)
```

---

## Status Badge

### Anatomy
```
┌───────────────────┐
│  ●  Status Text   │
└───────────────────┘
 ↑
Dot indicator
```

### Specifications

| Property | Value |
|----------|-------|
| Height | 24px |
| Padding X | 10px |
| Border Radius | 6px |
| Dot Size | 6px |
| Gap | 6px |
| Font Size | 12px |
| Font Weight | 500 |

### Variants

| Status | Background | Dot Color | Text |
|--------|------------|-----------|------|
| Active | success-bg-subtle | success-bg | success-text |
| Pending | warning-bg-subtle | warning-bg | warning-text |
| Failed | error-bg-subtle | error-bg | error-text |
| Inactive | neutral-100 | neutral-400 | text-secondary |
| Running | info-bg-subtle | info-bg | info-text |

### Dot Animation (Running)
```
Animation: pulse 2s infinite
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.5 }
}
```

---

## Component Tokens Reference

### Spacing Scale
```
4px  = spacing-1
8px  = spacing-2
12px = spacing-3
16px = spacing-4
20px = spacing-5
24px = spacing-6
32px = spacing-8
```

### Border Radius
```
4px  = radius-sm
6px  = radius-md
8px  = radius-DEFAULT
12px = radius-lg
16px = radius-xl
9999px = radius-full
```

### Font Sizes
```
12px = text-xs
14px = text-sm
16px = text-base
18px = text-lg
20px = text-xl
24px = text-2xl
```

### Font Weights
```
400 = font-normal
500 = font-medium
600 = font-semibold
700 = font-bold
```

---

*Use these specifications with the figma-tokens.json for consistent component creation*
