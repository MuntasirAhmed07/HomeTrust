# STRUCTURE.md — File & Folder Structure

## Top-Level Layout

```
real-estate-design/
├── public/                   # Static assets served directly
├── src/                      # All application source code
│   ├── assets/               # Images, SVGs, icons
│   ├── components/           # Reusable UI components (co-located CSS)
│   ├── Data/                 # Static data files (JS arrays/objects)
│   ├── Layout/               # App shell: Navbar, Footer, AppLayout, NavSideBar
│   ├── pages/                # Route-level page components
│   ├── animation.js          # Shared Framer Motion variant objects
│   ├── App.css               # Home-page-scoped styles + global utility classes
│   ├── App.jsx               # Router definition (createBrowserRouter)
│   ├── index.css             # Global CSS variables + body/root base styles
│   └── main.jsx              # React DOM entry point
├── index.html                # Vite HTML entry (Google Fonts + Font Awesome CDN)
├── vite.config.js            # Vite + React SWC config
├── eslint.config.js          # ESLint config
└── .prettierrc.json          # Prettier config
```

---

## src/pages/

Each file is a full route page component. Pages import components from `src/components/` and layout pieces as needed.

```
pages/
├── Home.jsx           # Main landing page — most complete page
├── OurStory.jsx       # Stub page
├── OurTeam.jsx        # Stub page
├── OurClient.jsx      # Stub page
├── OurBusiness.jsx    # Stub page
├── WhyHomeTrust.jsx   # Stub page
└── NotFound.jsx       # 404 fallback
```

---

## src/components/

Every component lives in its own folder with a matching CSS file (co-location pattern).

```
components/
├── AnimatedHeading/
│   ├── AnimatedHeading.jsx
│   └── AnimatedHeading.css
├── Carousel/
│   ├── Carousel.jsx
│   └── Carousel.css
├── Countup/
│   └── Countup.jsx
├── FloationImage/
│   ├── FloatImg.jsx
│   └── FloatImage.css
├── HomeStats/
│   ├── HomeStats.jsx
│   └── HomeStats.css
├── LetsConnect/
│   ├── LetsConnect.jsx
│   └── letsConnect.css
├── MarqueeText/
│   ├── MarqueeText.jsx
│   └── marqueetext.css
├── StatsSection/
│   ├── StatsSection.jsx       # Orchestrator — imports sub-components
│   ├── StatsSection.css       # Shared styles for the whole section
│   ├── BuildingImage.jsx
│   ├── StatisticItem.jsx
│   └── StatisticsContainer.jsx
├── TextEffect/
│   ├── TextEffect.jsx
│   └── TextEffect.css
├── ThemeSwitch/
│   ├── ThemeSwitch.jsx
│   └── ThemeSwitch.css
├── Map.jsx                    # Leaflet map (no dedicated folder — single file)
├── Sidebar.jsx                # Location info panel (no dedicated folder)
└── TextEffect.module.scss     # Orphaned SCSS module (unused/legacy)
```

---

## src/Layout/

App shell components shared across all pages. All share a single `Layout.css`.

```
Layout/
├── AppLayout.jsx     # Wraps Navbar + <Outlet /> + Footer; controls NavSideBar state
├── Navbar.jsx        # Fixed top nav with logo, theme toggle, menu button
├── NavSideBar.jsx    # Slide-in navigation drawer (Framer Motion animated)
├── Footer.jsx        # Footer with contact info, address, copyright
└── Layout.css        # All layout-level styles (navbar, sidebar, footer)
```

---

## src/Data/

Static data as JS modules — no API calls yet.

```
Data/
├── data.js           # realEstate (carousel images) and videos arrays
└── locations.js      # Map pin locations array for Leaflet map
```

Note: `src/data/locations.js` (lowercase) is also imported in Home.jsx — possible duplicate/casing issue on case-sensitive filesystems.

---

## src/assets/

Images and SVGs referenced in components.

```
assets/
├── Hero Image1.png      # Hero section background
├── Handshake.png        # LetsConnect section image
├── building.avif        # Legacy (replaced by Hero Image1.png)
├── logo.jsx             # Logo as a React SVG component
├── marker.png           # Leaflet map marker
├── Frame.svg, Line 1.svg, Line 2.svg  # Decorative SVGs
├── car1.jpg, car2.jpg, car3.jpg       # Legacy/unused car images
└── react.svg, vite.svg                # Scaffolding leftovers
```

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Component files | PascalCase.jsx | `LetsConnect.jsx` |
| Component folders | PascalCase | `LetsConnect/` |
| CSS files | camelCase or PascalCase .css | `letsConnect.css`, `StatsSection.css` |
| Page files | PascalCase.jsx | `OurStory.jsx` |
| Data files | camelCase.js | `data.js`, `locations.js` |
| CSS classes | kebab-case | `.lets-connect`, `.map-container` |
| Animation variants | camelCase exports | `menuSlide`, `stackTwo` |

---

## Where to Add New Code

| Adding... | Put it in... |
|-----------|-------------|
| New page | `src/pages/NewPage.jsx` + register in `App.jsx` router |
| New reusable component | `src/components/ComponentName/ComponentName.jsx` + `ComponentName.css` |
| New layout piece | `src/Layout/` + `Layout.css` |
| Shared animation variant | `src/animation.js` |
| Page-level styles | `src/App.css` (for Home) or create `NewPage.css` co-located with page |
| Static data | `src/Data/data.js` or new file in `src/Data/` |
| Static assets | `src/assets/` |
| Global CSS vars / theme | `src/index.css` |
