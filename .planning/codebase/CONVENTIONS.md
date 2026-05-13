# Coding Conventions

**Analysis Date:** 2026-04-19

---

## Component Syntax

**All components use arrow function syntax assigned to a `const`**, never `function` declarations at the top level.

```jsx
// Correct pattern used everywhere
const Navbar = ({ toggleNavSideBar }) => {
  return (...);
};

export default Navbar;
```

The only exception is `CountUp` (`src/components/Countup/Countup.jsx`), which uses `export default function CountUp(...)` — this is the outlier in an otherwise arrow-function-only codebase.

**`React.memo`** is applied to leaf/presentational components that receive props but do not manage state:
```jsx
export default React.memo(StatisticItem);   // src/components/StatsSection/StatisticItem.jsx
export default React.memo(BuildingImage);   // src/components/StatsSection/BuildingImage.jsx
```

---

## Naming Conventions

### Files and Directories
- Component files: **PascalCase** matching the component name: `Navbar.jsx`, `ThemeSwitch.jsx`, `AnimatedHeading.jsx`
- Component directories: **PascalCase** matching contained component: `AnimatedHeading/`, `StatsSection/`, `FloationImage/` (note: one typo — "Floation" instead of "Floating")
- CSS files: **PascalCase** matching component, or **camelCase lowercase**: `AnimatedHeading.css`, `letsConnect.css`, `marqueetext.css` — inconsistent, no single enforced rule
- Data files: **camelCase**: `data.js`, `locations.js`
- Utility/animation files: **camelCase**: `animation.js`

### Variables and Functions
- Local state variables: **camelCase**, boolean state names follow `is`/`show` prefixes: `isNavSideBarActive`, `showPanel`, `isDarkMode`, `isLoaded`
- State setters: `set` + PascalCase: `setIsNavSideBarActive`, `setShowPanel`
- Event handlers: descriptive verbs: `toggleNavSideBar`, `toggleTheme`, `applyTheme`, `handleClickOutside`, `paginate`
- Refs: `[noun]Ref` suffix: `navbarRef`, `heroImg`, `videoContainerRef`, `outlineRef`, `fillRef`, `containerRef`
- Data constants: **camelCase**: `realEstate`, `videos`, `statistics`
- GSAP context: conventional `ctx` / `tl` shorthand

### Component Props
- Boolean state props passed down: `showPanel`, `isNavSideBarActive`
- Handler props: verb-named: `toggleNavSideBar`, `setShowPanel`, `setSelectedLocation`
- Prop destructuring inline in function signature:
  ```jsx
  const Carousel = ({ images, videos, interval = 5000 }) => { ... }
  const StatisticItem = ({ value, tenth, label, sublabel }) => { ... }
  ```

### CSS Class Names
- **kebab-case** for all class names: `.navbar`, `.hero-txt`, `.menu-btn`, `.footer-container`, `.lets-connect-content`, `.stats-column`
- BEM-like modifiers using separate state classes: `.menu-icon-active`, `.info-panel.show`, `.background.open`, `.project-title.show`
- Some classes mix naming conventions in the same file: `HomeStats.css` uses `snake_case` (`.home_stats_area`, `.body_wrapper`, `.single_stat`, `.stat_left`) while all other CSS files use kebab-case — `HomeStats` appears to be copied/scaffolded from an external source
- ID attributes use long UUID-style strings (only in `HomeStats.jsx`)

---

## Import Organization

Imports appear in this consistent order across all files:

1. **Third-party libraries** (React, framer-motion, gsap, react-router-dom, leaflet)
2. **Internal animation utilities** (`../animation`)
3. **Internal assets** (`../assets/...`)
4. **Internal components** (`../components/...`)
5. **Internal data** (`../Data/...` or `../data/...`)
6. **Local CSS** (`./ComponentName.css`) — always last

```jsx
// Example from src/Layout/Navbar.jsx
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { opacity } from '../animation';
import Logo from '../assets/logo';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import './Layout.css';
```

Note: `React` is imported explicitly even with the new JSX transform (the project uses `eslint-plugin-react` with `jsx-runtime` rules, so explicit `React` import is not required but is included consistently anyway).

There is a **data folder casing inconsistency**: some imports use `../Data/data` (capital D) and others use `../data/locations` (lowercase d). This causes a latent case-sensitivity issue on Linux/CI environments.

---

## Animation Patterns

### Framer Motion — Variant Objects (defined in `src/animation.js`)

All reusable Framer Motion animations are extracted to a single **named export** object in `src/animation.js`. Variants follow `initial` / `enter` / `exit` (or `open` / `closed` / `center`) key naming:

```js
export const menuSlide = {
  initial: { x: '100%' },
  enter: { x: '0%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit:  { x: '100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};
```

Usage in JSX:
```jsx
<motion.div variants={menuSlide} animate="enter" exit="exit" initial="initial">
```

Direction-aware variants use factory functions (taking `direction` as custom prop):
```js
export const stack = {
  enter: (direction) => ({ y: direction > 0 ? '100%' : '-100%', opacity: 1 }),
  center: { y: '0%', opacity: 1, transition: { ease: 'easeInOut', duration: 0.8 } },
  exit: (direction) => ({ y: direction > 0 ? '-100%' : '100%', ... }),
};
```

### Framer Motion — Inline Animations (in JSX)

Scroll-linked or one-off animations are declared inline with `initial`, `whileInView`, `transition`, `viewport`:

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut' }}
  viewport={{ once: false }}
>
```

Scroll-driven transforms use `useScroll` + `useTransform` hooks:
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['50px 80%', '70% 60px'] });
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
// Applied via style prop: <motion.div style={{ scale }}>
```

### GSAP Animations

GSAP is used for scroll-triggered show/hide and timeline animations. The standard pattern:

```jsx
useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  let ctx = gsap.context(() => {
    gsap.fromTo(navbarRef.current, { y: 0 }, {
      y: '-100%',
      scrollTrigger: { ... },
    });
  }, navbarRef);

  return () => ctx.revert(); // Always clean up
}, []);
```

GSAP timelines use `gsap.timeline({ scrollTrigger: { scrub: true } })` for scroll-scrubbed sequences.

GSAP marquee animations use `gsap.timeline({ repeat: -1 })` for infinite loops, killed on cleanup via `tl.kill()`.

### Locomotive Scroll

Dynamic import pattern for Locomotive Scroll (avoids SSR issues):
```jsx
useEffect(() => {
  (async () => {
    const LocomotiveScroll = (await import('locomotive-scroll')).default;
    const locomotiveScroll = new LocomotiveScroll();
  })();
}, []);
```

Locomotive Scroll data attributes used in JSX: `data-scroll`, `data-scroll-speed="0.3"`.

---

## Dark Mode / Theme Variables

Theme is managed via `data-theme` attribute on `<body>`, toggled by `ThemeSwitch` using `localStorage`:

```js
document.querySelector('body').setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
```

CSS variables are defined in `src/index.css` under `:root` (light) and `body[data-theme='dark']`:

| Variable | Light | Dark |
|---|---|---|
| `--text-color` | `#070909` | `white` |
| `--background-color` | `#fffff0` | `#242123` |
| `--secondary-background-color` | `#f5f5dc` | `#1f1f1d` |
| `--secondary-color` | `#f26824` | `#f26824` (same) |
| `--toggle-thumb` | `#949699` | `#949699` (same) |
| `--toggle-track` | `#f5f5dc` | `black` |
| `--logo-color` | `#050606` | `#fffff0` |

**Pattern: always use `var(--token)` in CSS, never hard-coded colors for theme-sensitive values.**

Components that use dark/light class toggling directly (rather than CSS vars) are a code smell: `ThemeSwitch.css` hardcodes `color: black` on `.theme-switch span` and overrides with `color: white` on `.theme-switch.dark span`. New components should use `var(--text-color)` instead.

---

## Responsive Breakpoints

Three breakpoints are used across CSS files, consistently applied via `@media`:

| Breakpoint | Usage |
|---|---|
| `max-width: 480px` | Small mobile (font scale-down, `StatsSection.css`) |
| `max-width: 768px` | Mobile (layout reflow, hide/show elements, font adjustments) |
| `max-width: 1023px` | Tablet (layout adjustments, flex-direction changes) |
| `min-width: 769px` | Desktop-up (footer layout, building image visibility) |
| `min-width: 1024px` | Desktop (LetsConnect side-by-side layout) |

**Primary approach is desktop-first** (`max-width` queries dominate). `LetsConnect.css` uses mobile-first (`min-width` queries). No single enforced direction — follow the majority desktop-first pattern for new styles.

---

## Font Usage

Fonts are referenced as string names without explicit `@font-face` or Google Fonts `<link>` in index.html — loaded via external CDN or assumed system availability:

| Font | Usage | CSS Declaration |
|---|---|---|
| `Lato` | Headings, nav links, hero text, marquee | `font-family: 'Lato', sans-serif` |
| `Inter` | Project titles in Carousel | `font-family: 'Inter', sans-serif` |
| `Raleway` | Hero description paragraph | `font-family: 'Raleway', sans-serif` |
| `Arial` | Footer | `font-family: Arial, sans-serif` |
| System stack | Body default | `-apple-system, BlinkMacSystemFont, 'Segoe UI', ...` (set in `src/index.css`) |

`font-weight: 300` is the dominant weight for display text. Bold/heavy weights (`600`, `700`) are used for titles and stat values.

`clamp()` is used for responsive font sizing: `font-size: clamp(2rem, 5vw, 4rem)` in `AnimatedHeading.css`.

---

## JSX Patterns

### Fragment Usage
- `<>...</>` shorthand fragments are preferred over `<React.Fragment>`
- Used when returning multiple siblings without a semantic wrapper

### Conditional Rendering
```jsx
// Ternary for class toggling
className={`info-panel ${showPanel ? 'show' : ''}`}

// Short-circuit for conditional mounting
{isNavSideBarActive && <NavSideBar toggleNavSideBar={toggleNavSideBar} />}

// Ternary for content
{selectedLocation ? <div>...</div> : <p>No location selected</p>}
```

### Event Handlers
- Inline arrow functions are used for simple one-liners:
  ```jsx
  onClick={() => setShowPanel(false)}
  ```
- Extracted handler functions are used when the logic is more than one expression:
  ```jsx
  const toggleNavSideBar = () => { setIsNavSideBarActive(!isNavSideBarActive); };
  ```
- `onMouseDown` is preferred over `onClick` for interactive menu/close buttons (used in `Navbar.jsx` and `NavSideBar.jsx`) to avoid focus/blur ordering issues.

### Inline Styles
Inline `style` props are used for:
- Framer Motion `style={{ scale }}` bindings
- Dynamic layout values that change at runtime
- GSAP-influenced transforms on build components

Avoid inline styles for static layout — use CSS classes.

### SVG as JSX Component
The Logo is a full JSX component (`src/assets/logo.jsx`) that renders an `<svg>` element with spread props `{...props}`, allowing the parent to pass width/height or className overrides.

---

## CSS Patterns

### File Colocation
Each component has its CSS file in the same directory:
```
src/components/AnimatedHeading/
  AnimatedHeading.jsx
  AnimatedHeading.css
```

### CSS Nesting
Native CSS nesting (no preprocessor) is used in `Layout.css`:
```css
.menu-txt p {
  transition: all 2s cubic-bezier(0.56, 0.02, 0, 0.99);
  &:nth-of-type(2) {
    position: absolute;
    opacity: 0;
  }
}
```
This is Vite/modern browser syntax and requires modern browser support.

### Text Outline Effect
A recurring pattern for "outline text" over "filled text" (used in `TextEffect`, `MarqueeText`):
```css
.marq-top-text-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-color);
}
.marq-top-fill-text {
  color: var(--text-color);
}
```
Both elements are absolutely positioned on top of each other with different z-index values.

### Animation via CSS Transition + Class Toggle
CSS transitions triggered by class addition (not Framer Motion) for simpler interactions:
```css
.project-title { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.project-title.show { opacity: 1; transform: translateY(0); }
```

### SCSS/Module Files
Two SCSS module files exist but are not actively used in the current component tree:
- `src/components/TextEffect.module.scss`
- `src/style.module.scss`

These are legacy/experimental files. The active pattern is plain `.css` files.

---

## Data Layer

Data is stored as plain JavaScript `export const` arrays in `src/Data/`:
- `src/Data/data.js` — carousel images and video thumbnails (`realEstate`, `videos`)
- `src/Data/locations.js` — map location objects (`locations`)

No API calls or async data fetching in the current codebase. All data is static and hardcoded.

---

## Commented-Out Code

Large blocks of commented-out code exist in several files:
- `src/App.jsx` — entire original single-page implementation (~56 lines)
- `src/components/MarqueeText/MarqueeText.jsx` — two previous implementations (~79 lines)
- `src/pages/Home.jsx` — commented GSAP scale animation and text effect

This is a known pattern in the codebase. New code should not add to commented blocks; use git branches instead.

---

*Convention analysis: 2026-04-19*
