# Architecture

**Analysis Date:** 2026-04-19

## Pattern Overview

**Overall:** Single-Page Application (SPA) with client-side routing, feature-based component decomposition, and a clear layout shell wrapping page-level views.

**Key Characteristics:**
- React 18 SPA bundled by Vite, no server-side rendering
- Flat route tree defined in `src/App.jsx` via React Router v6 `createBrowserRouter`
- A persistent shell (`AppLayout`) wraps all inner routes; the 404 page sits outside that shell
- Animation is split between two libraries: GSAP handles scroll-driven and timeline animations; Framer Motion handles enter/exit transitions and spring-based interactions
- Theme (light/dark) is managed via a single component that writes `data-theme` to `<body>` and persists to `localStorage`

---

## Routing Strategy

Defined entirely in `src/App.jsx` using React Router v6 `createBrowserRouter` / `RouterProvider`.

```
/                → AppLayout (shell)
  /              → Home
  /ourstory      → OurStory
  /ourteam       → OurTeam
  /ourclients    → OurClient
  /ourbusiness   → OurBusiness
  /whyhometrust  → WhyHomeTrust
*                → NotFound  (no shell)
```

- The root path `''` renders `Home` (empty string, not `/`)
- `NotFound` at path `'*'` is intentionally outside `AppLayout` — it has no Navbar or Footer
- All route components are imported directly in `App.jsx`; no lazy loading is used

---

## Layout System

**Shell: `src/Layout/AppLayout.jsx`**

```
<Navbar />                  ← fixed, scroll-hide/show (GSAP)
<AnimatePresence>           ← wraps NavSideBar for enter/exit animation
  {isNavSideBarActive && <NavSideBar />}
</AnimatePresence>
<Outlet />                  ← page content renders here
<Footer />
```

`AppLayout` owns the `isNavSideBarActive` boolean state and passes `toggleNavSideBar` down to both `Navbar` (opens sidebar) and `NavSideBar` (closes sidebar). A `mousedown` listener on `document` closes the sidebar when the user clicks outside `.sidebar` or `.menu`.

**Layout CSS:** `src/Layout/Layout.css` — imported by both `Navbar.jsx` and `Footer.jsx`. Contains all Navbar, sidebar panel, and Footer styles in one flat file.

---

## Component Hierarchy

```
App
└── RouterProvider
    ├── AppLayout (shell)
    │   ├── Navbar
    │   │   └── ThemeSwitch
    │   ├── NavSideBar (conditional, animated)
    │   ├── <Outlet>
    │   │   └── Home  (most complex page)
    │   │       ├── Sidebar               ← map location detail panel
    │   │       ├── MarqueeText
    │   │       ├── FloatImg
    │   │       ├── Carousel
    │   │       │   └── (uses stack/stackTwo animation variants)
    │   │       ├── StatsSection
    │   │       │   ├── AnimatedHeading
    │   │       │   ├── StatisticsContainer
    │   │       │   │   └── StatisticItem  (x6, uses CountUp)
    │   │       │   └── BuildingImage
    │   │       ├── Map                   ← react-leaflet
    │   │       └── LetsConnect
    │   └── Footer
    └── NotFound (no shell)
```

Stub pages (`OurStory`, `OurTeam`, `OurClient`, `OurBusiness`, `WhyHomeTrust`, `NotFound`) each return a single `<div>` with a text label — placeholders with no content yet.

---

## Data Flow

**Static data:**
- `src/Data/data.js` exports `realEstate` (carousel images array) and `videos` (carousel thumbnails array)
- `src/Data/locations.js` exports a default array of map pin objects with `{ name, description, latitude, longitude }`
- Both are imported directly where needed; no shared store or context

**Map location detail state (local to `Home`):**
```
Home state: selectedLocation, showPanel
    ↓ props
Map  →  on marker click: setSelectedLocation(location), setShowPanel(true)
    ↓ props
Sidebar  →  renders selectedLocation details; setShowPanel(false) on close
```

**NavSidebar visibility state (local to `AppLayout`):**
```
AppLayout state: isNavSideBarActive
    ↓ prop: toggleNavSideBar
Navbar  →  onMouseDown → toggleNavSideBar()
NavSideBar  →  onMouseDown on CLOSE button → toggleNavSideBar()
document mousedown listener  →  closes sidebar on outside click
```

**State Management:** No global state (no Redux, no Zustand, no Context API). All state is local to the component that owns it.

---

## Animation Architecture

Two libraries are used side-by-side, with distinct responsibilities.

### Framer Motion — Declarative / Transition-based

- **Centralized variants:** `src/animation.js` exports all Framer Motion variant objects. Components import only the variant they need.

| Export | Used in | Effect |
|---|---|---|
| `menuSlide` | `NavSideBar` | Sidebar slides in/out from right (`x: 100%` → `0%`) |
| `opacity` | `Navbar` (MENU label) | Fade in on mount |
| `stack` | `Carousel` | Vertical stack slide for full-size image |
| `stackTwo` | `Carousel` | Horizontal stack slide for thumbnail |
| `background` | (defined, unused) | Width expand |
| `Slide` | (defined, unused) | Horizontal slide 80px |

- `AnimatePresence mode="wait"` in `AppLayout` governs the NavSideBar mount/unmount cycle
- `AnimatePresence mode="popLayout"` in `Carousel` governs image transitions
- `motion.div` with `initial/whileInView/transition` is used directly inline in `Home.jsx` for hero description and video section (no shared variant)
- `AnimatedHeading` uses `useScroll` + `useTransform` to animate `letterSpacing` on scroll
- `CountUp` (in `src/components/Countup/Countup.jsx`) uses `useMotionValue` + `useSpring` + `useInView` for animated number counting; it does NOT use `<motion.*>` elements, only Framer Motion hooks

### GSAP — Imperative / Scroll-driven

- **`Navbar.jsx`:** Uses `gsap.fromTo` + `ScrollTrigger` inside `useLayoutEffect` to hide/show the navbar on scroll direction change. Cleans up with `ctx.revert()` on unmount.
- **`Home.jsx`:** Uses a `gsap.timeline` + `ScrollTrigger` to expand a hero image clip path (`inset(5%)` → none) as the user scrolls. Also uses Framer Motion `useScroll` + `useTransform` for a separate video container scale effect.
- **`MarqueeText.jsx`:** Uses a GSAP `timeline` with `repeat: -1` to animate two text elements (`outlineRef`, `fillRef`) continuously across the viewport. Kills the timeline on unmount.

**Rule of thumb in this codebase:**
- GSAP = scroll-triggered, continuous loops, timeline-sequenced
- Framer Motion = mount/unmount transitions, viewport-entry reveals, spring physics

---

## Theme / Dark Mode System

**Implementation:** `src/components/ThemeSwitch/ThemeSwitch.jsx`

- Local `isDarkMode` boolean state
- On mount: reads `localStorage.getItem('theme')` and calls `applyTheme`
- `applyTheme(darkMode)` writes `data-theme="dark"` or `data-theme="light"` to `document.body` and persists to `localStorage`
- Toggle checkbox calls `toggleTheme` on `onChange`

**CSS Variables:** `src/index.css` defines two token sets:

```css
:root {
  --text-color: #070909;
  --background-color: #fffff0;
  --secondary-background-color: #f5f5dc;
  --secondary-color: #f26824;
  --toggle-thumb: #949699;
  --toggle-track: #f5f5dc;
  --logo-color: #050606;
}

body[data-theme='dark'] {
  --text-color: white;
  --background-color: #242123;
  --secondary-background-color: #1f1f1d;
  /* ... */
  --logo-color: #fffff0;
}
```

All themed colors throughout the codebase reference these CSS custom properties. The system is self-contained — no React context, no CSS-in-JS.

---

## Page Structure — Home (only fully implemented page)

```
<Home>
  backdrop div (.background)       ← blurred overlay when map panel is open
  <Sidebar />                      ← fixed right panel, CSS transition (not Framer Motion)
  .hero-txt                        ← "building / trust" heading, static HTML
  .hero-img (ref: heroImg)         ← GSAP clip-path scroll expand
  motion.div .hero-desc            ← Framer Motion whileInView fade+slide
  motion.section .video-section    ← Framer Motion whileInView fade+slide
    <MarqueeText />                ← GSAP infinite loop
    motion.div .video-container    ← Framer Motion scale via useTransform
    <FloatImg />                   ← Locomotive Scroll parallax (data-scroll-speed)
  <Carousel />                     ← Framer Motion stack transitions
  <section .building-section>
    <StatsSection />
      <AnimatedHeading />          ← Framer Motion letterSpacing + per-char opacity
      <StatisticsContainer />
        <StatisticItem /> (x6)
          <CountUp />              ← Framer Motion spring hooks
      <BuildingImage />
  <section .map-container>
    <Map />                        ← react-leaflet + react-leaflet-cluster
  <LetsConnect />                  ← static section
</Home>
```

**Locomotive Scroll:** Instantiated dynamically (`await import('locomotive-scroll')`) inside `useEffect` in both `Home.jsx` and `TextEffect.jsx`. Used for parallax via `data-scroll` / `data-scroll-speed` attributes on elements. No dedicated scroll container configured; relies on default document scroll.

---

## Error Handling

No error boundaries are present. Runtime errors will propagate to the React default error screen. No `try/catch` around async operations in effects (Locomotive Scroll dynamic import is unguarded).

---

## Cross-Cutting Concerns

**Logging:** `console.log` only; no logging library.
**Validation:** None.
**Authentication:** None.
**API calls:** None (all data is static arrays in `src/Data/`).
**SEO:** Title/meta tags in `index.html` are Vite defaults; no dynamic head management.

---

*Architecture analysis: 2026-04-19*
