---
name: presentation-typography-animations
description: "Typography, fonts, animations, and visual effects for presentations. Defines font systems, animation keyframes, timing, logo integration, and motion design patterns."
tags: [typography, fonts, animations, keyframes, transitions, effects, motion-design, logo]
version: "1.0.0"
---

# Presentation Typography & Animation Systems

> **Complete typography and animation framework for presentations**
>
> This skill focuses on FONTS, ANIMATIONS, and EFFECTS - not colors, content, or structure.

## Overview

This skill provides comprehensive guidance for typography selection, animation design, and visual effects in presentations. It covers font pairing, animation keyframes, timing functions, logo integration, and accessibility considerations for motion.

**What this skill covers:**
- ✅ Font selection by industry and use case
- ✅ Complete typography scale (sizes, weights, line heights)
- ✅ Animation keyframes and timing functions
- ✅ Component animation patterns
- ✅ Logo integration and styling
- ✅ Button, badge, and UI element styling
- ✅ Reduced motion accessibility

**What this skill does NOT cover:**
- ❌ Color schemes and branding (see presentation-branding-colors.md)
- ❌ Content structure and patterns (see presentation-content-patterns.md)
- ❌ HTML components (see presentation-html-components.md)

---

# PART 1: TYPOGRAPHY SYSTEM

## Font Selection by Industry

### Technical/Developer Focused

**Recommended:** Monospace fonts for technical credibility

```css
--font-primary: 'IBM Plex Mono', monospace;
--font-code: 'JetBrains Mono', monospace;
```

**Alternatives:**
- `'Roboto Mono'` - Clean, geometric, highly legible
- `'Fira Code'` - Includes programming ligatures
- `'Source Code Pro'` - Adobe's monospace, widely used
- `'Inconsolata'` - Condensed, space-efficient

**Best for:** Developer tools, infrastructure, backend services, technical documentation

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### Business/Enterprise

**Recommended:** Sans-serif fonts for professionalism

```css
--font-primary: 'Inter', sans-serif;
--font-headings: 'Inter', sans-serif;
```

**Alternatives:**
- `'Roboto'` - Neutral, versatile, Google's standard
- `'Open Sans'` - Friendly yet professional
- `'Helvetica Neue'` - Classic corporate aesthetic
- `'Source Sans Pro'` - Open-source, clean lines

**Best for:** Enterprise software, SaaS, B2B presentations, corporate decks

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### Creative/Design

**Recommended:** Display fonts with personality

```css
--font-primary: 'Poppins', sans-serif;
--font-headings: 'Montserrat', sans-serif;
```

**Alternatives:**
- `'Raleway'` - Elegant, geometric sans-serif
- `'Nunito'` - Rounded, friendly, approachable
- `'Work Sans'` - Modern, clean, versatile
- `'DM Sans'` - Contemporary geometric sans

**Best for:** Design tools, creative platforms, consumer apps, marketing decks

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

---

## Typography Scale

**Complete sizing and spacing system:**

```css
:root {
  /* Font Sizes */
  --fs-title:    48px;   /* Slide titles */
  --fs-subtitle: 18px;   /* Slide subtitles */
  --fs-h1:       32px;   /* Major headings */
  --fs-h2:       24px;   /* Section headings */
  --fs-h3:       18px;   /* Subsection headings */
  --fs-body:     14px;   /* Body text */
  --fs-small:    13px;   /* Secondary text */
  --fs-tiny:     11px;   /* Captions, labels */
  --fs-code:     13px;   /* Code blocks */

  /* Font Weights */
  --fw-light:   400;
  --fw-regular: 500;
  --fw-medium:  600;
  --fw-bold:    700;

  /* Line Heights */
  --lh-tight:   1.2;     /* Headings */
  --lh-normal:  1.6;     /* Body text */
  --lh-loose:   1.8;     /* Reading-focused */
  --lh-code:    1.6;     /* Code blocks */

  /* Letter Spacing */
  --ls-tight:   -0.02em;  /* Large headings */
  --ls-normal:   0em;     /* Body text */
  --ls-wide:     0.1em;   /* Labels, badges */
  --ls-wider:    0.2em;   /* Section headers */
}
```

---

## Typography Usage Patterns

### Slide Titles

```css
.slide-title {
  font-size: var(--fs-title);      /* 48px */
  font-weight: var(--fw-bold);     /* 700 */
  line-height: var(--lh-tight);   /* 1.2 */
  letter-spacing: var(--ls-tight); /* -0.02em */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}
```

### Slide Subtitles

```css
.slide-subtitle {
  font-size: var(--fs-subtitle);  /* 18px */
  color: var(--dim-t);
  margin-bottom: 48px;
  letter-spacing: 0.05em;
}
```

### Body Text

```css
.card-content {
  font-size: var(--fs-body);       /* 14px */
  font-weight: var(--fw-light);    /* 400 */
  line-height: var(--lh-normal);   /* 1.6 */
  color: var(--muted);
}
```

### Labels/Headers

```css
.card-header {
  font-size: var(--fs-tiny);        /* 11px */
  font-weight: var(--fw-medium);    /* 600 */
  letter-spacing: var(--ls-wider);  /* 0.2em */
  text-transform: uppercase;
  color: var(--primary);
}
```

### Code Blocks

```css
.code-block pre {
  font-family: var(--font);
  font-size: var(--fs-code);        /* 13px */
  line-height: var(--lh-code);      /* 1.6 */
  color: #e8c4b8;
}
```

---

# PART 2: ANIMATION SYSTEM

## Core Animation Keyframes

**Standard animations used across all presentations:**

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(248, 150, 128, 0.3); }
  50% { box-shadow: 0 0 30px rgba(248, 150, 128, 0.6); }
}
```

---

## Animation Timing System

**Duration and easing functions:**

```css
:root {
  /* Durations */
  --duration-fast:   0.2s;  /* Hover effects, quick transitions */
  --duration-normal: 0.3s;  /* Standard transitions */
  --duration-slow:   0.5s;  /* Entrance animations */
  --duration-slower: 0.8s;  /* Complex animations */

  /* Easing Functions */
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## Component Animation Patterns

### Card Entrance

```css
.card {
  animation: slideIn var(--duration-slow) var(--ease-out);
}

/* Or shorter */
.card {
  animation: slideIn 0.5s ease;
}
```

### Slide Entrance

```css
.slide {
  animation: fadeIn 0.4s ease;
}
```

### Stats Bounce

```css
.stat-card {
  animation: bounceIn 0.6s ease;
}
```

### Staggered List Items

**Create sequential entrance for multiple items:**

```css
.feature-item {
  animation: slideIn 0.5s ease;
}

.feature-item:nth-child(1) { animation-delay: 0.0s; }
.feature-item:nth-child(2) { animation-delay: 0.2s; }
.feature-item:nth-child(3) { animation-delay: 0.4s; }
.feature-item:nth-child(4) { animation-delay: 0.6s; }
```

### Logo Glow (Continuous)

```css
#logo {
  animation: glow 3s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(248, 150, 128, 0.3);
}
```

---

## Hover & Transition Effects

### Button Hover

```css
.btn {
  transition: all var(--duration-fast) var(--ease-out);
}

.btn:hover:not(:disabled) {
  background: var(--dim);
  border-color: var(--primary);
  transform: translateY(-2px);
}
```

### Card Hover

```css
.feature-item {
  transition: all 0.3s ease;
}

.feature-item:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
}
```

### Table Row Hover

```css
.comparison-table tr {
  transition: background 0.2s ease;
}

.comparison-table tr:hover {
  background: var(--dim);
}
```

---

# PART 3: COMPONENT STYLING

## Button System

**Base button:**
```css
.btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--font);
  font-size: var(--fs-small);     /* 13px */
  font-weight: var(--fw-regular); /* 500 */
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.btn:hover:not(:disabled) {
  background: var(--dim);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

**Primary button:**
```css
.btn.primary {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.btn.primary:hover:not(:disabled) {
  background: var(--secondary);
  border-color: var(--secondary);
}
```

---

## Badge System

**Standard badge:**
```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--fs-tiny);      /* 11px */
  font-weight: var(--fw-medium);  /* 600 */
  letter-spacing: var(--ls-wide); /* 0.1em */
  text-transform: uppercase;
  border: 1px solid var(--primary);
  color: var(--primary);
  background: rgba(248, 150, 128, 0.1);
}
```

**Status badges:**
```css
.badge.success {
  border-color: var(--ok);
  color: var(--ok);
  background: rgba(39, 174, 96, 0.1);
}

.badge.warning {
  border-color: var(--warn);
  color: var(--warn);
  background: rgba(243, 156, 18, 0.1);
}

.badge.error {
  border-color: var(--error);
  color: var(--error);
  background: rgba(231, 76, 60, 0.1);
}
```

---

## Progress Bar System (3-Dot Navigation)

**Progress dots:**
```css
.progress-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  opacity: 0.4;
  align-self: flex-end;
  margin-bottom: 2px;
}

.progress-dot:hover {
  border-color: var(--primary);
  opacity: 0.8;
}

.progress-dot.active {
  background: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 15px rgba(248, 150, 128, 0.5);
  width: 12px;
  height: 12px;
  opacity: 1;
  align-self: center;
  margin-bottom: 0;
}

.progress-dot.adjacent {
  opacity: 0.6;
  width: 6px;
  height: 6px;
  background: rgba(248, 150, 128, 0.3);
  border-color: rgba(248, 150, 128, 0.5);
}
```

**Progress lines:**
```css
.progress-line {
  width: 8px;
  height: 2px;
  background: var(--border);
  flex-shrink: 0;
  opacity: 0.3;
  align-self: flex-end;
  margin-bottom: 4px;
}

.progress-line.active {
  background: var(--primary);
  opacity: 0.6;
}
```

---

# PART 4: LOGO INTEGRATION

## Logo Best Practices

### Assets Folder Structure

```
presentation/
├── assets/
│   ├── logo.png           # Primary logo
│   ├── logo-white.png     # White version for dark backgrounds
│   └── favicon.ico        # Browser favicon
├── presentation.html
└── .claude/skills/
```

### Logo Implementation Options

**Option 1: Image Logo (Recommended for Branding)**
```html
<img id="logo" src="./assets/logo.png" alt="Company Logo" onerror="this.style.display='none'" />
```

**Option 2: Emoji/Icon Logo (Quick Prototypes)**
```html
<div id="logo">☁️</div>
```

**Option 3: Text Logo (Minimalist)**
```html
<div id="logo">
  <span class="logo-text">CO</span>
</div>
```

---

## Logo Styling

**For image logos:**
```css
#logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;              /* Circular logo */
  object-fit: cover;               /* Maintains aspect ratio */
  flex-shrink: 0;                  /* Prevents compression */
  box-shadow: 0 0 20px rgba(248, 150, 128, 0.2);  /* Soft glow */
}
```

**For emoji/text logos:**
```css
#logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  box-shadow: 0 0 20px rgba(248, 150, 128, 0.3);
  animation: glow 3s ease-in-out infinite;
  font-size: 32px;
  font-weight: 700;
}
```

---

## Logo File Guidelines

**File Format:**
- PNG with transparency (recommended)
- SVG for scalability
- Avoid JPG for logos (no transparency)

**Dimensions:**
- Minimum: 200x200px
- Recommended: 500x500px or higher
- Keep aspect ratio 1:1 for circular logos

**File Naming:**
- `logo.png` - Primary logo
- `logo-white.png` - Light version
- `logo-dark.png` - Dark version
- Use lowercase and hyphens

**Path Reference:**
```html
<!-- Relative path (recommended) -->
<img src="./assets/logo.png" alt="Company Logo" />

<!-- Avoid absolute paths -->
<img src="/Users/username/Desktop/logo.png" alt="Company Logo" />
```

**Accessibility:**
```html
<!-- Always include meaningful alt text -->
<img src="./assets/logo.png" alt="Acme Corp Logo" />
```

---

# PART 5: CUSTOM SCROLLBAR

**For better visual consistency:**

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--dim);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border);
}
```

---

# PART 6: ACCESSIBILITY - REDUCED MOTION

**Respect user preferences for motion:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**This disables animations for users who:**
- Have vestibular disorders
- Experience motion sickness
- Have set "Reduce Motion" in OS settings

---

# PART 7: CSS ARCHITECTURE

**Recommended ordering:**

```css
/* 1. CSS Variables (Theme) */
:root {
  /* Colors, fonts, sizes, spacing */
}

/* 2. Reset & Base */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  overflow: hidden;
}

/* 3. Custom Scrollbar */
::-webkit-scrollbar { /* ... */ }

/* 4. Layout Components */
#app, #header, #slide-container, #footer { /* ... */ }

/* 5. Content Components */
.card, .feature-list, .flow, .timeline { /* ... */ }

/* 6. UI Components */
.btn, .badge, .progress-dot { /* ... */ }

/* 7. Animations */
@keyframes fadeIn { /* ... */ }
@keyframes slideIn { /* ... */ }

/* 8. Responsive */
@media (max-width: 768px) { /* ... */ }

/* 9. Accessibility */
@media (prefers-reduced-motion) { /* ... */ }
```

---

# PART 8: MOBILE RESPONSIVE TYPOGRAPHY

**Scale down for mobile:**

```css
@media (max-width: 768px) {
  .slide-title {
    font-size: 32px;  /* Down from 48px */
  }

  .slide-subtitle {
    font-size: 16px;  /* Down from 18px */
  }

  .card-title {
    font-size: 20px;  /* Down from 24px */
  }

  .card-content {
    font-size: 13px;  /* Down from 14px */
  }
}
```

---

# SUMMARY

## Typography Quick Reference

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Slide Title | 48px | 700 | 1.2 | -0.02em |
| Slide Subtitle | 18px | 400 | 1.6 | 0.05em |
| Card Title | 24px | 600 | 1.6 | normal |
| Body Text | 14px | 400 | 1.8 | normal |
| Labels | 11px | 600 | 1.4 | 0.2em |
| Code | 13px | 400 | 1.6 | normal |

## Animation Quick Reference

| Animation | Use Case | Duration |
|-----------|----------|----------|
| fadeIn | Slide entrance | 0.4s |
| slideIn | Cards, components | 0.5s |
| bounceIn | Stats, emphasis | 0.6s |
| glow | Logo (continuous) | 3s infinite |
| pulse | Loading states | 2s infinite |

## Font Pairing by Industry

| Industry | Primary Font | Alternative |
|----------|-------------|-------------|
| **Tech/Dev** | IBM Plex Mono | Roboto Mono |
| **Enterprise** | Inter | Roboto |
| **Creative** | Poppins | Montserrat |
| **Healthcare** | Inter | Open Sans |
| **Finance** | Inter | Helvetica Neue |

## Implementation Checklist

✅ Choose appropriate font for industry
✅ Import font from Google Fonts
✅ Set up typography scale in `:root`
✅ Define animation keyframes
✅ Configure timing functions
✅ Add button hover effects
✅ Integrate logo with proper styling
✅ Add custom scrollbar styling
✅ Implement reduced motion support
✅ Test on mobile devices

**Your typography and animations should enhance readability and engagement, not distract from the message.**
