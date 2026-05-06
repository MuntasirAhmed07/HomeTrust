# Technology Stack

**Analysis Date:** 2026-04-19

---

## Languages

**Primary:**
- JavaScript (ES2020+) — all source files use `.js` / `.jsx`
- JSX — React component syntax throughout `src/`

**Secondary:**
- SCSS — used for scoped/module styles (`src/style.module.scss`, `src/components/TextEffect/TextEffect.module.scss`)
- CSS — used for component-level stylesheets (e.g., `src/index.css`, `src/App.css`, `src/Layout/Layout.css`)

---

## Runtime

**Environment:**
- Node.js (browser-targeted build; no server runtime)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

**Module System:**
- ES Modules (`"type": "module"` in `package.json`)

---

## Frameworks

**Core:**
- React `^18.3.1` — UI component library; entry point at `src/main.jsx` via `createRoot`
- React DOM `^18.3.1` — DOM renderer

**Routing:**
- React Router DOM `^6.30.0` — client-side routing using `createBrowserRouter` and `RouterProvider`; defined in `src/App.jsx`

**Build/Dev:**
- Vite `^6.0.5` — dev server and production bundler; config at `vite.config.js`
- `@vitejs/plugin-react-swc` `^3.5.0` — SWC-based React transform (replaces Babel for faster builds)

---

## Styling

**Approach:** Component-scoped CSS files + global CSS custom properties (CSS variables)

**Theming:**
- CSS custom properties defined in `:root` in `src/index.css`
- Dark mode toggled via `data-theme="dark"` attribute on `<body>`, managed by `src/components/ThemeSwitch/ThemeSwitch.jsx` with `localStorage` persistence
- Two themes: `light` (default) and `dark`

**CSS Variables (light):**
- `--text-color: #070909`
- `--background-color: #fffff0`
- `--secondary-background-color: #f5f5dc`
- `--secondary-color: #f26824`

**CSS Variables (dark):**
- `--text-color: white`
- `--background-color: #242123`
- `--secondary-background-color: #1f1f1d`

**Preprocessor:**
- Sass `^1.85.1` — installed for SCSS support; used sparingly (two `.scss` files in `src/`)

**Formatting:**
- Prettier `^3.5.3`; config at `.prettierrc.json`
  - `printWidth: 80`, `tabWidth: 2`, `singleQuote: true`, `trailingComma: "all"`, `semi: true`

---

## Animation Libraries

**Framer Motion `^12.4.7`** — primary declarative animation library
- Used for page transitions, scroll-driven animations, and component enter/exit effects
- Key APIs used: `motion`, `AnimatePresence`, `useScroll`, `useTransform`, `useSpring`, `useMotionValue`, `useInView`
- Animation variants defined centrally in `src/animation.js` (e.g., `menuSlide`, `stack`, `stackTwo`, `opacity`, `Slide`)
- Files: `src/Layout/AppLayout.jsx`, `src/Layout/Navbar.jsx`, `src/Layout/NavSideBar.jsx`, `src/pages/Home.jsx`, `src/components/AnimatedHeading/AnimatedHeading.jsx`, `src/components/Carousel/Carousel.jsx`, `src/components/Countup/Countup.jsx`

**GSAP (GreenSock) — `gsap` package (version resolved from `@gsap/react ^2.1.2` and direct `gsap` import)**
- Used for imperative timeline and scroll-triggered animations
- Plugin: `ScrollTrigger` — registered via `gsap.registerPlugin(ScrollTrigger)` 
- Files: `src/Layout/Navbar.jsx` (navbar hide/show on scroll), `src/pages/Home.jsx` (hero `clipPath` reveal), `src/components/MarqueeText/MarqueeText.jsx` (marquee loop)
- `@gsap/react ^2.1.2` — React bindings for GSAP

**Locomotive Scroll `^5.0.0-beta.21`** — smooth scroll engine
- Dynamically imported (async) to avoid SSR issues
- Used via `data-scroll` / `data-scroll-speed` attributes on DOM elements
- Files: `src/pages/Home.jsx`, `src/components/TextEffect/TextEffect.jsx`

**`@popmotion/popcorn ^0.4.4`** — utility math functions (easing helpers); listed as dependency, not observed in active source files

**`motion ^12.5.0`** — listed as dependency alongside `framer-motion` (likely the standalone `motion` package from the same author); not observed in active imports

---

## Marquee / Text Scroll

- **react-fast-marquee `^1.6.5`** — imported in `src/pages/Home.jsx` (`import Marquee from 'react-fast-marquee'`) though the active `MarqueeText` component uses a GSAP-powered implementation instead

---

## Maps

- **Leaflet `^1.9.4`** — core map library
- **React Leaflet `^4.0.0`** — React bindings for Leaflet
- **react-leaflet-cluster `^2.1.0`** — marker clustering for Leaflet
- Map component: `src/components/Map.jsx`

---

## State Management

**Approach:** Local React component state only (`useState`, `useRef`)
- No global state library (no Redux, Zustand, Context API usage observed)
- Theme state persisted via `localStorage` in `src/components/ThemeSwitch/ThemeSwitch.jsx`
- Map panel state (`showPanel`, `selectedLocation`) lifted to `src/pages/Home.jsx`

---

## Linting

- ESLint `^9.17.0` — flat config format at `eslint.config.js`
- Plugins: `eslint-plugin-react ^7.37.2`, `eslint-plugin-react-hooks ^5.0.0`, `eslint-plugin-react-refresh ^0.4.16`
- Target files: `**/*.{js,jsx}`; `ecmaVersion: 2020`

---

## TypeScript / Type Support

- `@types/react ^18.3.18` and `@types/react-dom ^18.3.5` installed as dev dependencies
- Project uses plain JavaScript (`.js`/`.jsx`), not TypeScript — types are present for editor intellisense only

---

## Key Dependencies Summary

| Package | Version | Role |
|---|---|---|
| `react` | `^18.3.1` | Core UI framework |
| `react-dom` | `^18.3.1` | DOM renderer |
| `react-router-dom` | `^6.30.0` | Client-side routing |
| `framer-motion` | `^12.4.7` | Declarative animation |
| `@gsap/react` | `^2.1.2` | GSAP React bindings |
| `gsap` | (peer/transitive) | Imperative animation + ScrollTrigger |
| `locomotive-scroll` | `^5.0.0-beta.21` | Smooth scroll |
| `motion` | `^12.5.0` | Motion library (same ecosystem as framer-motion) |
| `@popmotion/popcorn` | `^0.4.4` | Animation math utilities |
| `leaflet` | `^1.9.4` | Interactive maps |
| `react-leaflet` | `^4.0.0` | React map bindings |
| `react-leaflet-cluster` | `^2.1.0` | Map marker clustering |
| `react-fast-marquee` | `^1.6.5` | Marquee text component |
| `sass` | `^1.85.1` | SCSS preprocessor |
| `vite` | `^6.0.5` | Build tool |
| `@vitejs/plugin-react-swc` | `^3.5.0` | SWC React transform |

---

## Configuration Files

| File | Purpose |
|---|---|
| `package.json` | Dependencies, scripts |
| `vite.config.js` | Vite build config (minimal — only `plugin-react-swc`) |
| `eslint.config.js` | ESLint flat config |
| `.prettierrc.json` | Prettier formatting rules |
| `index.html` | HTML shell, font preconnects, Font Awesome CDN link |

---

## Build Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

*Stack analysis: 2026-04-19*
