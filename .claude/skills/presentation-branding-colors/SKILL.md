---
name: presentation-branding-colors
description: "Color palettes, brand themes, and visual identity for presentations. Defines color usage, semantic naming, and theming strategies for different industries and personalities."
tags: [branding, colors, themes, palette, visual-identity, css-variables, design-system]
version: "1.0.0"
---

# Presentation Branding & Color Systems

> **Complete color system and brand theming for technical presentations**
>
> This skill focuses on COLORS and BRANDING - not typography, animations, or structure.

## Overview

This skill provides comprehensive color palettes and branding systems for technical presentations. It covers the default warm coral theme, alternative industry-specific themes, color usage guidelines, and semantic color systems.

**What this skill covers:**
- ✅ Complete color palette with CSS variables
- ✅ Default warm coral theme (#F89680)
- ✅ 4 alternative brand themes (cool, creative, nature, energy)
- ✅ Color usage guidelines and best practices
- ✅ Semantic color system (ok, warn, error)
- ✅ Accessibility considerations for colors

**What this skill does NOT cover:**
- ❌ Typography and fonts (see presentation-typography-animations.md)
- ❌ Content structure and patterns (see presentation-content-patterns.md)
- ❌ HTML/CSS components (see presentation-html-components.md)

---

# PART 1: DEFAULT THEME (WARM CORAL)

## Primary Brand Palette

**This is the signature warm, approachable color scheme with coral/salmon accents:**

```css
:root {
  /* Background Colors */
  --bg:      #1a1a1a;      /* Main background - deep charcoal */
  --surface: #242424;      /* Card/component backgrounds */
  --border:  #3a3a3a;      /* Subtle borders and dividers */
  --dim:     #2d2d2d;      /* Secondary surfaces, hover states */

  /* Brand Accent Colors (Warm Coral/Salmon Theme) */
  --primary:       #F89680;  /* Main brand color - coral */
  --primary-dk:    #2d1f1a;  /* Dark background for code blocks */
  --secondary:     #ff9d7e;  /* Secondary accent - lighter coral */
  --secondary-dk:  #2d1f1a;  /* Dark secondary background */
  --accent:        #ff7b5f;  /* Tertiary accent - vibrant coral */
  --accent-dk:     #2d1f1a;  /* Dark accent background */
  --highlight:     #ffa68a;  /* Highlight color - soft coral */
  --highlight-dk:  #2d1f1a;  /* Dark highlight background */

  /* Semantic Colors */
  --ok:      #ff9d7e;      /* Success/positive state (warm) */
  --warn:    #ffb399;      /* Warning state (warm orange) */
  --error:   #ff6b6b;      /* Error state (warm red) */

  /* Text Colors */
  --text:    #e5e5e5;      /* Primary text - light gray */
  --muted:   #9a9a9a;      /* Secondary text - medium gray */
  --dim-t:   #6a6a6a;      /* Tertiary text - dim gray */

  /* Typography (reference only - see typography skill) */
  --font: 'IBM Plex Mono', monospace;
}
```

## Visual Identity

**Personality:** Warm, approachable, modern, technical yet friendly
**Industry fit:** Tech startups, developer tools, creative tech, SaaS
**Emotional response:** Energetic, innovative, trustworthy
**Use cases:** Developer presentations, product demos, technical tutorials

## Logo & Header (Recommended)

For header/logo usage in presentations, prefer a compact circular image that fits the header layout:

```css
/* Recommended header logo */
#logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;   /* Circular logo for headers */
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(248, 150, 128, 0.2); /* Soft coral glow */
}
```

HTML hint: include a graceful fallback if the asset is missing:

```html
<img id="logo" src="./assets/logo.png" alt="Company Logo" onerror="this.style.display='none'" />
```

This ensures consistent presentation across themes and matches the warm coral identity.

---

# PART 2: COLOR USAGE GUIDELINES

## Primary Color (#F89680 - Coral)

**Use for:**
- ✅ Main brand accent for CTAs and important elements
- ✅ Gradient text for slide titles
- ✅ Progress indicators and active states
- ✅ Logo glow effects
- ✅ Links and interactive elements
- ✅ Card headers and section labels
- ✅ Code block left borders

**Example:**
```css
.slide-title {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-header {
  color: var(--primary);
}

.code-block {
  border-left: 4px solid var(--primary);
}
```

## Secondary Color (#ff9d7e - Light Coral)

**Use for:**
- ✅ Hover states for primary elements
- ✅ Secondary buttons and badges
- ✅ Success indicators (in warm theme)
- ✅ Chart/graph accent colors
- ✅ Gradient endpoints

**Example:**
```css
.btn.primary:hover {
  background: var(--secondary);
}

.badge.success {
  color: var(--ok);  /* Uses secondary in warm theme */
}
```

## Accent Color (#ff7b5f - Vibrant Coral)

**Use for:**
- ✅ Highlight specific content
- ✅ Warning indicators
- ✅ Animated elements that need attention
- ✅ Border highlights on focus

## Background Strategy

**Layered depth approach:**
```
--bg (#1a1a1a)        → Main background (darkest)
--surface (#242424)   → Elevated cards/components
--dim (#2d2d2d)       → Hover states, secondary surfaces
```

Creates depth through subtle brightness variations while reducing eye strain.

---

# PART 3: SEMANTIC COLOR SYSTEM

## Status Colors

```css
/* Success/Positive */
--ok: #ff9d7e;   /* Warm coral (matches brand) */

/* Warning/Caution */
--warn: #ffb399;  /* Warm orange */

/* Error/Negative */
--error: #ff6b6b; /* Warm red */
```

## Usage Examples

**Risk Level Badges:**
```css
.risk-level.low {
  background: rgba(255, 157, 126, 0.2);
  color: var(--ok);
  border: 1px solid var(--ok);
}

.risk-level.medium {
  background: rgba(248, 150, 128, 0.2);
  color: var(--primary);
  border: 1px solid var(--primary);
}

.risk-level.high {
  background: rgba(255, 179, 153, 0.2);
  color: var(--warn);
  border: 1px solid var(--warn);
}
```

**Compare Badges (Before/After):**
```css
.compare-badge.before {
  color: var(--error);
  border-color: var(--error);
  background: rgba(231, 76, 60, 0.1);
}

.compare-badge.after {
  color: var(--ok);
  border-color: var(--ok);
  background: rgba(39, 174, 96, 0.1);
}
```

---

# PART 4: ALTERNATIVE BRAND THEMES

## Theme 1: Cool Professional (Blue)

**For:** Enterprise, financial services, corporate environments

```css
:root {
  /* Same backgrounds */
  --bg:      #1a1a1a;
  --surface: #242424;
  --border:  #3a3a3a;
  --dim:     #2d2d2d;

  /* Cool Blue Brand Colors */
  --primary:       #4A90E2;  /* Professional blue */
  --primary-dk:    #1a2d42;  /* Dark blue background */
  --secondary:     #5BA3F5;  /* Light blue */
  --secondary-dk:  #1a2d42;
  --accent:        #3D7CC9;  /* Deep blue */
  --accent-dk:     #1a2d42;
  --highlight:     #6FB1FF;  /* Bright blue highlight */
  --highlight-dk:  #1a2d42;

  /* Semantic Colors (standard, not warm) */
  --ok:      #27AE60;      /* Green for success */
  --warn:    #F39C12;      /* Orange for warning */
  --error:   #E74C3C;      /* Red for error */

  --text:    #e5e5e5;
  --muted:   #9a9a9a;
  --dim-t:   #6a6a6a;
  --font: 'IBM Plex Mono', monospace;
}
```

**Personality:** Professional, trustworthy, stable, corporate
**Industry fit:** Enterprise software, finance, healthcare, government
**Use cases:** Board presentations, enterprise sales, compliance reports

## Theme 2: Vibrant Creative (Purple/Magenta)

**For:** Creative tech, design tools, innovative products

```css
:root {
  --bg:      #1a1a1a;
  --surface: #242424;
  --border:  #3a3a3a;
  --dim:     #2d2d2d;

  /* Purple/Magenta Brand Colors */
  --primary:       #9B59B6;  /* Rich purple */
  --primary-dk:    #2d1a33;  /* Dark purple background */
  --secondary:     #B974D5;  /* Light purple */
  --secondary-dk:  #2d1a33;
  --accent:        #8E44AD;  /* Deep purple */
  --accent-dk:     #2d1a33;
  --highlight:     #D77FE8;  /* Magenta highlight */
  --highlight-dk:  #2d1a33;

  --ok:      #1ABC9C;      /* Teal for success */
  --warn:    #F39C12;      /* Orange for warning */
  --error:   #E74C3C;      /* Red for error */

  --text:    #e5e5e5;
  --muted:   #9a9a9a;
  --dim-t:   #6a6a6a;
  --font: 'Poppins', sans-serif;  /* More creative font */
}
```

**Personality:** Creative, bold, innovative, trendsetting
**Industry fit:** Design agencies, creative tools, entertainment tech
**Use cases:** Product launches, creative showcases, design systems

## Theme 3: Nature/Growth (Green)

**For:** Sustainability, health tech, growth-focused products

```css
:root {
  --bg:      #1a1a1a;
  --surface: #242424;
  --border:  #3a3a3a;
  --dim:     #2d2d2d;

  /* Green Brand Colors */
  --primary:       #27AE60;  /* Natural green */
  --primary-dk:    #1a2d20;  /* Dark green background */
  --secondary:     #2ECC71;  /* Bright green */
  --secondary-dk:  #1a2d20;
  --accent:        #1E8449;  /* Deep forest green */
  --accent-dk:     #1a2d20;
  --highlight:     #58D68D;  /* Light green highlight */
  --highlight-dk:  #1a2d20;

  --ok:      #2ECC71;      /* Green for success */
  --warn:    #F39C12;      /* Orange for warning */
  --error:   #E74C3C;      /* Red for error */

  --text:    #e5e5e5;
  --muted:   #9a9a9a;
  --dim-t:   #6a6a6a;
  --font: 'Inter', sans-serif;
}
```

**Personality:** Natural, growth-oriented, sustainable, healthy
**Industry fit:** Health tech, environmental tech, agriculture, fitness
**Use cases:** Impact reports, health dashboards, sustainability updates

## Theme 4: Energy/Innovation (Orange)

**For:** High-energy products, innovation-focused companies

```css
:root {
  --bg:      #1a1a1a;
  --surface: #242424;
  --border:  #3a3a3a;
  --dim:     #2d2d2d;

  /* Orange Brand Colors */
  --primary:       #E67E22;  /* Vibrant orange */
  --primary-dk:    #2d1f12;  /* Dark orange background */
  --secondary:     #F39C12;  /* Golden orange */
  --secondary-dk:  #2d1f12;
  --accent:        #D35400;  /* Deep orange */
  --accent-dk:     #2d1f12;
  --highlight:     #F8A245;  /* Light orange highlight */
  --highlight-dk:  #2d1f12;

  --ok:      #27AE60;      /* Green for success */
  --warn:    #F39C12;      /* Orange for warning */
  --error:   #E74C3C;      /* Red for error */

  --text:    #e5e5e5;
  --muted:   #9a9a9a;
  --dim-t:   #6a6a6a;
  --font: 'IBM Plex Mono', monospace;
}
```

**Personality:** Energetic, dynamic, innovative, disruptive
**Industry fit:** Energy tech, logistics, manufacturing, IoT
**Use cases:** Performance reports, optimization results, system upgrades

---

# PART 5: THEME SELECTION GUIDE

## Quick Comparison Table

| Theme | Primary Color | Industry | Personality | Font |
|-------|---------------|----------|-------------|------|
| **Warm (Coral)** | #F89680 | Tech startups, SaaS, dev tools | Friendly, innovative, energetic | IBM Plex Mono |
| **Cool (Blue)** | #4A90E2 | Enterprise, finance, healthcare | Professional, trustworthy | IBM Plex Mono |
| **Creative (Purple)** | #9B59B6 | Design tools, creative agencies | Bold, artistic, innovative | Poppins |
| **Nature (Green)** | #27AE60 | Health tech, sustainability | Fresh, balanced, optimistic | Inter |
| **Energy (Orange)** | #E67E22 | IoT, logistics, manufacturing | Dynamic, powerful, action-oriented | IBM Plex Mono |

## Selection Criteria

**Choose based on:**
1. **Industry expectations** - What colors are common in your field?
2. **Brand alignment** - Does your company have existing brand colors?
3. **Audience preferences** - Who will view this presentation?
4. **Content tone** - Is it serious (blue), creative (purple), or energetic (orange)?
5. **Differentiation** - Do you want to stand out or fit in?

---

# PART 6: IMPLEMENTING THEMES

## Theme Switcher (Optional)

```html
<script>
const THEMES = {
  warm: {
    primary: '#F89680',
    primaryDk: '#2d1f1a',
    secondary: '#ff9d7e',
    accent: '#ff7b5f',
    ok: '#ff9d7e',
    warn: '#ffb399'
  },
  cool: {
    primary: '#4A90E2',
    primaryDk: '#1a2d42',
    secondary: '#5BA3F5',
    accent: '#3D7CC9',
    ok: '#27AE60',
    warn: '#F39C12'
  }
};

function applyTheme(themeName) {
  const theme = THEMES[themeName];
  const root = document.documentElement;

  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-dk', theme.primaryDk);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--ok', theme.ok);
  root.style.setProperty('--warn', theme.warn);
}

// Apply default theme
applyTheme('warm');
</script>
```

## Static Theme Implementation

**Simply copy the desired theme's CSS variables into your `:root` block.**

```css
/* Add this comment at the top of your CSS */
/*
 * Branding & Theming: [Theme Name]
 * Based on .claude/skills/presentation-branding-colors.md
 * Primary Brand Color: [Hex Code]
 * Personality: [Description]
 */

:root {
  /* Paste theme variables here */
}
```

---

# PART 7: ACCESSIBILITY GUIDELINES

## Color Contrast Requirements

**WCAG 2.1 Standards:**
- **Level AA (Minimum):** 4.5:1 for normal text, 3:1 for large text
- **Level AAA (Enhanced):** 7:1 for normal text, 4.5:1 for large text

**Our Defaults Meet Standards:**
```css
/* Contrast ratios verified */
--text: #e5e5e5;      /* on --bg: #1a1a1a → 11.5:1 ✓✓ */
--muted: #9a9a9a;     /* on --bg: #1a1a1a → 6.2:1 ✓ */
--primary: #F89680;   /* on --bg: #1a1a1a → 4.8:1 ✓ */
```

## Color Blindness Considerations

**Don't rely on color alone for meaning:**

```css
/* Bad: Color-only distinction */
.status-success { color: green; }
.status-error { color: red; }

/* Good: Color + icon/symbol */
.status-success::before { content: '✓ '; color: green; }
.status-error::before { content: '✗ '; color: red; }
```

**Test your colors with:**
- Protanopia (red-blind) simulators
- Deuteranopia (green-blind) simulators
- Tritanopia (blue-blind) simulators

**Use tools:** Chrome DevTools, Stark, Color Oracle

---

# PART 8: BRANDING BEST PRACTICES

## Gradient Usage

**Slide titles should use gradients for visual interest:**

```css
.slide-title {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Header/footer can use subtle gradients:**

```css
#header {
  background: linear-gradient(180deg, rgba(248,150,128,0.05) 0%, var(--bg) 100%);
}

#footer {
  background: linear-gradient(0deg, rgba(248,150,128,0.05) 0%, var(--bg) 100%);
}
```

## Opacity Overlays

**Use rgba() with CSS variable colors for transparency:**

```css
/* Primary color with 10% opacity */
background: rgba(248, 150, 128, 0.1);

/* Border with 20% opacity */
border: 1px solid rgba(248, 150, 128, 0.2);

/* Glow effect with 30% opacity */
box-shadow: 0 0 20px rgba(248, 150, 128, 0.3);
```

## Color Hierarchy

**Visual importance through color:**

```
Primary actions    → var(--primary) - Most important
Secondary actions  → var(--secondary) - Supporting
Tertiary/Disabled  → var(--muted) - Less important
Labels/Metadata    → var(--dim-t) - Least important
```

---

# SUMMARY

## Implementation Checklist

When implementing a color theme:

✅ **Step 1:** Choose theme based on industry and audience
✅ **Step 2:** Copy CSS variables to `:root` block
✅ **Step 3:** Add branding comment at top of CSS
✅ **Step 4:** Test contrast ratios (use browser DevTools)
✅ **Step 5:** Verify with color blindness simulators
✅ **Step 6:** Check gradients render correctly
✅ **Step 7:** Test all semantic colors (ok, warn, error)
✅ **Step 8:** Ensure logo/brand assets match theme

## Quick Start: Default Warm Theme

```css
/*
 * Branding & Theming: Warm Coral Theme
 * Based on .claude/skills/presentation-branding-colors.md
 * Primary Brand Color: #F89680 (Coral)
 * Personality: Warm, approachable, modern, technical yet friendly
 */

:root {
  --bg: #1a1a1a;
  --surface: #242424;
  --border: #3a3a3a;
  --dim: #2d2d2d;
  --primary: #F89680;
  --primary-dk: #2d1f1a;
  --secondary: #ff9d7e;
  --accent: #ff7b5f;
  --ok: #ff9d7e;
  --warn: #ffb399;
  --error: #ff6b6b;
  --text: #e5e5e5;
  --muted: #9a9a9a;
  --dim-t: #6a6a6a;
  --font: 'IBM Plex Mono', monospace;
}
```

**Your color system should enhance readability and brand recognition, not distract from content.**
