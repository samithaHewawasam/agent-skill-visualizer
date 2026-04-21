---
name: presentation-html-components
description: "HTML/CSS/JavaScript implementation for building interactive presentation decks. Provides component library, file structure, and technical implementation patterns."
tags: [html, css, javascript, components, structure, navigation, responsive, implementation]
version: "1.0.0"
---

# Presentation HTML Components & Structure

> **Technical implementation guide for building HTML-based presentations**
>
> This skill focuses on HOW to build presentations technically - not content or visual design.

## Overview

This skill provides the complete technical stack for creating interactive, single-file HTML presentations. It covers HTML structure, CSS component patterns, JavaScript navigation, and best practices for building maintainable presentation systems.

**What this skill covers:**
- ✅ File structure and architecture
- ✅ HTML component library (cards, grids, flows, tables)
- ✅ JavaScript navigation and interaction logic
- ✅ Responsive layout patterns
- ✅ Best practices for performance and accessibility

**What this skill does NOT cover:**
- ❌ Content strategy and narrative patterns (see presentation-content-patterns.md)
- ❌ Color schemes and branding (see presentation-branding-colors.md)
- ❌ Typography and animations (see presentation-typography-animations.md)

---

# PART 1: FILE STRUCTURE

## Single-File Architecture

All presentations are self-contained HTML files with inlined CSS and JavaScript.

```
presentation.html
├── <head>
│   ├── Meta tags & title
│   ├── Google Fonts link
│   └── <style> - Complete CSS system
└── <body>
    ├── #app
    │   ├── #header (logo, title, progress dots)
    │   ├── #slide-container (main content area)
    │   └── #footer (navigation, slide counter, author)
    └── <script> - Presentation logic
```

**Benefits of single-file approach:**
- ✅ Easy to share (one file)
- ✅ No external dependencies
- ✅ Works offline
- ✅ Fast loading

---

# PART 2: CORE HTML STRUCTURE

## Basic Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Presentation Title</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  /* CSS goes here */
</style>
</head>
<body>
<div id="app">
  <div id="header">
    <img id="logo" src="./assets/logo.png" alt="Company Logo" onerror="this.style.display='none'" />
    <div id="header-content">
      <div style="font-size: 10px; color: var(--dim-t); letter-spacing: 0.2em;">CATEGORY</div>
      <div style="font-size: 28px; font-weight: 700;">Main Title</div>
      <div style="font-size: 13px; color: var(--dim-t);">Subtitle</div>
    </div>
    <div id="progress-bar"></div>
  </div>

  <div id="slide-container">
    <div class="slide" id="slide-content"></div>
  </div>

  <div id="footer">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div class="slide-counter">
        Slide <span class="current" id="current-slide">1</span> / <span id="total-slides">0</span>
      </div>
      <div class="author-credit">
        Created by <span class="name">Your Name</span>
      </div>
    </div>
    <div style="display: flex; gap: 12px;">
      <button class="btn" id="btn-prev" onclick="navigate(-1)">← Previous</button>
      <button class="btn primary" id="btn-next" onclick="navigate(1)">Next →</button>
    </div>
  </div>
</div>

<script>
  /* JavaScript goes here */
</script>
</body>
</html>
```

## Core Layout CSS

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#header {
  padding: 20px 32px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(248,150,128,0.05) 0%, var(--bg) 100%);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

#slide-container {
  flex: 1;
  overflow-y: auto;
  padding: 64px 48px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.slide {
  max-width: 1200px;
  width: 100%;
  animation: fadeIn 0.4s ease;
}

#footer {
  padding: 20px 32px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: linear-gradient(0deg, rgba(248,150,128,0.05) 0%, var(--bg) 100%);
}
```

---

# PART 3: COMPONENT LIBRARY

## 1. Card Component

**HTML:**
```html
<div class="card">
  <div class="card-header">SECTION LABEL</div>
  <div class="card-title">Card Title</div>
  <div class="card-content">
    Main content text with details and explanations.
  </div>
</div>
```

**CSS:**
```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  animation: slideIn 0.5s ease;
}

.card-header {
  font-size: 10px;
  color: var(--primary);
  letter-spacing: 0.2em;
  font-weight: 600;
  margin-bottom: 12px;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text);
}

.card-content {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.8;
}

.card-content strong {
  color: var(--text);
  font-weight: 600;
}
```

## 2. Code Block Component

**HTML:**
```html
<div class="code-block" data-label="CODE TYPE">
<pre>function example() {
  return "formatted code";
}
</pre>
</div>
```

**CSS:**
```css
.code-block {
  background: var(--primary-dk);
  border-left: 4px solid var(--primary);
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  overflow-x: auto;
  position: relative;
  animation: slideIn 0.6s ease;
}

.code-block::before {
  content: attr(data-label);
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 10px;
  color: var(--primary);
  letter-spacing: 0.1em;
  font-weight: 600;
}

.code-block pre {
  font-family: var(--font);
  font-size: 13px;
  color: #e8c4b8;
  line-height: 1.6;
  margin: 0;
}
```

## 3. Feature List Grid

**HTML:**
```html
<div class="feature-list">
  <div class="feature-item">
    <div class="feature-icon">📝</div>
    <div class="feature-title">Feature Name</div>
    <div class="feature-desc">Description text</div>
  </div>
  <!-- More feature items -->
</div>
```

**CSS:**
```css
.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 24px 0;
}

.feature-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease;
}

.feature-item:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: var(--primary-dk);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}

.feature-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}
```

## 4. Flow Diagram

**HTML:**
```html
<div class="flow">
  <div class="flow-step">
    <div class="flow-number">1</div>
    <div class="flow-content">
      <div class="flow-label">Step Title</div>
      <div class="flow-desc">Step description</div>
    </div>
  </div>
  <div class="flow-arrow">↓</div>
  <!-- More steps -->
</div>
```

**CSS:**
```css
.flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  animation: slideIn 0.5s ease;
}

.flow-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
}

.flow-content {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.flow-label {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}

.flow-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}

.flow-arrow {
  text-align: center;
  font-size: 24px;
  color: var(--primary);
  margin: 8px 0;
}
```

## 5. Comparison Grid

**HTML:**
```html
<div class="compare-grid">
  <div class="compare-card before">
    <div class="compare-title">
      <span>Option A</span>
      <span class="compare-badge before">LABEL A</span>
    </div>
    <div class="card-content">Details...</div>
  </div>
  <div class="compare-card after">
    <div class="compare-title">
      <span>Option B</span>
      <span class="compare-badge after">LABEL B</span>
    </div>
    <div class="card-content">Details...</div>
  </div>
</div>
```

**CSS:**
```css
.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin: 24px 0;
}

.compare-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  border-top: 4px solid var(--primary);
  animation: slideIn 0.5s ease;
}

.compare-card.before {
  border-top-color: var(--error);
}

.compare-card.after {
  border-top-color: var(--ok);
}

.compare-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.compare-badge {
  font-size: 10px;
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid;
  font-weight: 600;
  letter-spacing: 0.1em;
}

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

## 6. Problem Cards Grid

**HTML:**
```html
<div class="problem-grid">
  <div class="problem-card">
    <div class="problem-title">⚠ Problem Name</div>
    <div class="problem-desc">Problem description</div>
    <div class="solution">Solution approach</div>
  </div>
  <!-- More problem cards -->
</div>
```

**CSS:**
```css
.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 24px 0;
}

.problem-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  animation: slideIn 0.5s ease;
}

.problem-card::before {
  content: '⚠';
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 120px;
  opacity: 0.05;
}

.problem-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--warn);
  margin-bottom: 12px;
}

.problem-desc {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 16px;
  line-height: 1.6;
}

.solution {
  font-size: 13px;
  color: var(--ok);
  padding: 12px;
  background: rgba(39, 174, 96, 0.1);
  border-left: 3px solid var(--ok);
  border-radius: 4px;
}

.solution::before {
  content: '✓ ';
  font-weight: 700;
}
```

## 7. Stats Grid

**HTML:**
```html
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">75%</div>
    <div class="stat-label">Metric Name</div>
  </div>
  <!-- More stats -->
</div>
```

**CSS:**
```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 24px 0;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  animation: bounceIn 0.6s ease;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 13px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

## 8. Highlight Box

**HTML:**
```html
<div class="highlight-box">
  <div class="highlight-title">💡 Key Insight</div>
  <div class="highlight-content">
    Important information to emphasize
  </div>
</div>
```

**CSS:**
```css
.highlight-box {
  background: var(--primary-dk);
  border-left: 4px solid var(--primary);
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  animation: slideIn 0.5s ease;
}

.highlight-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 12px;
}

.highlight-content {
  font-size: 14px;
  color: var(--text);
  line-height: 1.8;
}
```

## 9. Timeline

**HTML:**
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker">1</div>
    <div class="timeline-content">
      <div class="timeline-phase">PHASE 1 • WEEKS 1-2</div>
      <div class="timeline-title">Phase Title</div>
      <div class="timeline-desc">Phase description</div>
    </div>
  </div>
  <!-- More timeline items -->
</div>
```

**CSS:**
```css
.timeline {
  margin: 24px 0;
}

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  animation: slideIn 0.5s ease;
}

.timeline-marker {
  width: 32px;
  height: 32px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 4px;
}

.timeline-content {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.timeline-phase {
  font-size: 12px;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 4px;
  letter-spacing: 0.1em;
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}

.timeline-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}
```

## 10. Comparison Table

**HTML:**
```html
<table class="comparison-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Option A</th>
      <th>Option B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Feature Name</td>
      <td>Description A</td>
      <td>Description B</td>
    </tr>
  </tbody>
</table>
```

**CSS:**
```css
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  animation: fadeIn 0.6s ease;
}

.comparison-table th,
.comparison-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.comparison-table th {
  background: var(--surface);
  color: var(--primary);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.comparison-table td {
  font-size: 13px;
  color: var(--muted);
}

.comparison-table tr:hover {
  background: var(--dim);
}
```

---

# PART 4: JAVASCRIPT IMPLEMENTATION

## Slides Data Structure

```javascript
const SLIDES = [
  {
    title: 'Slide Title',
    subtitle: 'Brief description',
    content: `<!-- HTML content -->`
  },
  // ... more slides
];
```

## Core Navigation Logic

```javascript
let currentSlide = 0;
const totalSlides = SLIDES.length;

function renderSlide(index) {
  const slide = SLIDES[index];
  document.getElementById('slide-content').innerHTML = `
    <div class="slide-title">${slide.title}</div>
    <div class="slide-subtitle">${slide.subtitle}</div>
    ${slide.content}
  `;
  document.getElementById('current-slide').textContent = index + 1;
  renderProgressBar();
  document.getElementById('btn-prev').disabled = (index === 0);
  document.getElementById('btn-next').disabled = (index === totalSlides - 1);
  // Respect user preference for reduced motion where appropriate
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function navigate(direction) {
  const newIndex = currentSlide + direction;
  if (newIndex >= 0 && newIndex < totalSlides) {
    currentSlide = newIndex;
    renderSlide(currentSlide);
  }
}

function jumpToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentSlide = index;
    renderSlide(currentSlide);
  }
}
```

## Progress Bar Rendering (3-Dot Navigation)

```javascript
function renderProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  let progressHTML = '';

  const prevSlide = currentSlide - 1;
  const nextSlide = currentSlide + 1;

  // Show previous dot if exists
  if (prevSlide >= 0) {
    progressHTML += `<div class="progress-dot adjacent" onclick="jumpToSlide(${prevSlide})" title="Slide ${prevSlide + 1}"></div>`;
    progressHTML += `<div class="progress-line active"></div>`;
  }

  // Show current dot (always visible)
  progressHTML += `<div class="progress-dot active" onclick="jumpToSlide(${currentSlide})" title="Slide ${currentSlide + 1}"></div>`;

  // Show next dot if exists
  if (nextSlide < totalSlides) {
    progressHTML += `<div class="progress-line"></div>`;
    progressHTML += `<div class="progress-dot adjacent" onclick="jumpToSlide(${nextSlide})" title="Slide ${nextSlide + 1}"></div>`;
  }

  progressBar.innerHTML = progressHTML;
}
```

Note: For very compact single-file presentations it's acceptable to render small layout primitives inline. If your project doesn't include the `.progress-line` helper styles, use this inline-style variant when generating the progress UI:

```javascript
// Inline-style progress-line example (used in some single-file builds)
if (i > 0) {
  progressHTML += `<div class="progress-dot adjacent" onclick="jumpToSlide(${i-1})" title="Slide ${i}"></div><div class="progress-line" style="width:14px;height:2px;background:var(--border);margin:0 6px;align-self:center"></div>`;
}
progressHTML += `<div class="progress-dot active" onclick="jumpToSlide(${i})" title="Slide ${i+1}"></div>`;
if (i < totalSlides - 1) {
  progressHTML += `<div class="progress-line" style="width:14px;height:2px;background:var(--border);margin:0 6px;align-self:center"></div><div class="progress-dot adjacent" onclick="jumpToSlide(${i+1})" title="Slide ${i+2}"></div>`;
}
```

This keeps the component portable when CSS extraction isn't desirable.

## Keyboard Navigation

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'Home') jumpToSlide(0);
  if (e.key === 'End') jumpToSlide(totalSlides - 1);
});
```

## Initialization

```javascript
window.onload = () => {
  document.getElementById('total-slides').textContent = totalSlides;
  renderSlide(0);
};
```

---

# PART 5: RESPONSIVE DESIGN

## Mobile Breakpoint (@media max-width: 768px)

```css
@media (max-width: 768px) {
  #header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  #logo {
    width: 40px;
    height: 40px;
  }

  #progress-bar {
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
  }

  #slide-container {
    padding: 32px 24px;
  }

  .slide-title {
    font-size: 32px;
  }

  #footer {
    padding: 20px 24px;
    flex-direction: column;
    gap: 16px;
  }

  .feature-list,
  .compare-grid,
  .problem-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
```

---

# PART 6: BEST PRACTICES

## Performance

- ✅ Inline all CSS and JS (no external requests)
- ✅ Use CSS animations over JavaScript
- ✅ Lazy-load heavy content if needed
- ✅ Optimize image sizes

## Accessibility

- ✅ Provide alt text for images
- ✅ Use semantic HTML structure
- ✅ Support keyboard navigation
- ✅ Use ARIA labels where needed
- ✅ Maintain color contrast (4.5:1 minimum)

## Code Organization

```css
/* 1. CSS Variables (Theme) */
:root { /* ... */ }

/* 2. Reset & Base */
*, *::before, *::after { /* ... */ }

/* 3. Layout */
#app, #header, #footer { /* ... */ }

/* 4. Components */
.card, .btn, .badge { /* ... */ }

/* 5. Animations */
@keyframes fadeIn { /* ... */ }

/* 6. Responsive */
@media (max-width: 768px) { /* ... */ }
```

---

# SUMMARY

## Component Quick Reference

| Component | Use Case | Grid Type |
|-----------|----------|-----------|
| Card | General content blocks | N/A |
| Code Block | Technical examples | N/A |
| Feature List | Capability showcase | Auto-fit, min 300px |
| Flow Diagram | Sequential processes | Vertical stack |
| Comparison Grid | Before/after, options | Auto-fit, min 350px |
| Problem Cards | Issues + solutions | Auto-fit, min 300px |
| Stats Grid | Metrics display | Auto-fit, min 200px |
| Highlight Box | Key takeaways | N/A |
| Timeline | Phased approach | Vertical stack |
| Comparison Table | Detailed feature matrix | Full width |

## Key Technical Points

- **Single file:** Everything inlined for portability
- **Responsive:** Mobile-first with desktop enhancements
- **Keyboard nav:** Arrow keys, Home, End supported
- **Progress bar:** 3-dot navigation (prev/current/next)
- **Auto-scroll:** Resets to top on slide change
- **Grid layouts:** Auto-fit with min-width for responsiveness
