# Codebase Concerns

**Analysis Date:** 2026-04-19

---

## Dead / Commented-Out Code

**[HIGH] Entire original App.jsx logic is commented out**
- Issue: Lines 1–56 of `src/App.jsx` are a fully commented-out version of the application (imports, state, full JSX tree including `LocomotiveScroll`, `Map`, `Sidebar`, `Carousel`, `TextEffect`).
- Files: `src/App.jsx` lines 1–56
- Impact: Misleading noise; a reader cannot tell what was intentional history vs. abandoned code.
- Fix approach: Delete the commented block entirely; use git history for recovery if needed.

**[HIGH] Two full commented-out implementations in MarqueeText.jsx**
- Issue: `src/components/MarqueeText/MarqueeText.jsx` lines 1–79 contain two separate complete commented-out implementations (framer-motion version 1 and version 2) before the live GSAP version.
- Files: `src/components/MarqueeText/MarqueeText.jsx` lines 1–79
- Impact: File is 127 lines; ~63% is dead code. Confusing to maintain.
- Fix approach: Remove both commented blocks. Keep only the active GSAP implementation.

**[MEDIUM] Commented-out GSAP ScrollTrigger scale animation in Home.jsx**
- Issue: `src/pages/Home.jsx` lines 31–49 contain a commented-out `useLayoutEffect` with a GSAP scale scroll animation including `markers: true` (debug markers).
- Files: `src/pages/Home.jsx` lines 31–49
- Impact: Debug markers comment (`// markers: true`) indicates this was never finalized. Dead weight.
- Fix approach: Remove or implement; if the scroll-scale effect is desired, use the live `framer-motion` version already present.

**[MEDIUM] Commented-out hero section JSX in Home.jsx**
- Issue: `src/pages/Home.jsx` lines 81–86 contain a commented-out `<TextEffect />` + hero `<img>` block.
- Files: `src/pages/Home.jsx` lines 81–86
- Impact: Suggests unresolved design decision about which hero layout to use.
- Fix approach: Pick one layout; delete the other.

**[LOW] Commented-out CSS blocks in multiple files**
- `src/components/MarqueeText/marqueetext.css` lines 1–41: entire first CSS ruleset commented out.
- `src/components/TextEffect/TextEffect.css` lines 64–71: commented-out dark-mode stroke override.
- `src/App.css` lines 104–106: commented-out `.marker-cluster div` rule.
- `src/Layout/Layout.css` lines 191–194: empty commented `.header` block; lines 220–226: commented-out `.footer` block.
- `src/components/StatsSection/StatsSection.css` lines 109–136: large commented-out `.animated-heading` block.
- Fix approach: Delete all commented-out CSS; use version control for history.

---

## Stub / Incomplete Pages

**[HIGH] Five of six routes render only a text stub**
- Issue: The following pages contain only `return <div>PageName</div>` with no real content:
  - `src/pages/OurStory.jsx`
  - `src/pages/OurTeam.jsx`
  - `src/pages/OurClient.jsx`
  - `src/pages/OurBusiness.jsx`
  - `src/pages/WhyHomeTrust.jsx`
- Impact: Navigating to `/ourstory`, `/ourteam`, `/ourclients`, `/ourbusiness`, `/whyhometrust` shows a blank white page with a single unstyled word. These routes are linked in the navigation sidebar.
- Fix approach: Implement pages or add placeholder UI with a "coming soon" message.

**[HIGH] NotFound page is a stub**
- Issue: `src/pages/NotFound.jsx` renders only `<div>NotFound</div>`. Any 404 navigation shows an unstyled, empty page.
- Files: `src/pages/NotFound.jsx`
- Fix approach: Add a branded 404 page with a link back to Home.

**[MEDIUM] NavSideBar search bar is a placeholder**
- Issue: `src/Layout/NavSideBar.jsx` line 16 renders `<p>Search bar</p>` — a non-functional text label with no input or search logic.
- Files: `src/Layout/NavSideBar.jsx` line 16
- Impact: Visible to end users in the navigation overlay.
- Fix approach: Implement a real search input or remove the placeholder.

---

## Unused / Dead Code in Active Files

**[HIGH] `HomeStats` component exists but is never rendered**
- Issue: `src/components/HomeStats/HomeStats.jsx` is a complete, standalone stats implementation (different from `StatsSection`) that is never imported anywhere in the app.
- Files: `src/components/HomeStats/HomeStats.jsx`
- Impact: ~138 lines of code that run in no user session. Also references `AnimatedHeading` without importing it, so it would crash if mounted.
- Fix approach: Either integrate as the canonical stats component (replacing `StatsSection`) or delete it entirely.

**[HIGH] `HomeStats.jsx` uses `AnimatedHeading` without importing it**
- Issue: `src/components/HomeStats/HomeStats.jsx` line 9 renders `<AnimatedHeading />` but there is no import statement for it (only `import './HomeStats.css'` on line 1).
- Files: `src/components/HomeStats/HomeStats.jsx` line 1 vs. line 9
- Impact: Runtime ReferenceError if this component is ever rendered.
- Fix approach: Add `import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';` or remove the usage.

**[MEDIUM] `Car1`, `Car2`, `Car3` are imported but never used**
- Issue: `src/Data/data.js` lines 1–3 import `car1.jpg`, `car2.jpg`, `car3.jpg` (combined: ~5.8 MB) but none of the three variables appear anywhere else in `data.js` or the codebase.
- Files: `src/Data/data.js` lines 1–3
- Impact: Vite bundles these heavy assets into the build unnecessarily.
- Fix approach: Remove the three import lines. Delete the image files from `src/assets/` if they have no planned use.

**[MEDIUM] `CountUp` imported but not used in `Home.jsx`**
- Issue: `src/pages/Home.jsx` line 11 imports `CountUp` but never renders `<CountUp>` anywhere in the JSX.
- Files: `src/pages/Home.jsx` line 11
- Impact: Unnecessary import; minor dead code.
- Fix approach: Remove the import.

**[MEDIUM] `AnimatedHeading` imported but not used in `Home.jsx`**
- Issue: `src/pages/Home.jsx` line 9 imports `AnimatedHeading` but never renders it in the JSX.
- Files: `src/pages/Home.jsx` line 9
- Impact: Unnecessary import.
- Fix approach: Remove the import.

**[MEDIUM] `isActive` state is declared but never read**
- Issue: `src/pages/Home.jsx` line 65: `const [isActive, setIsActive] = useState(showPanel);` — `isActive` is never read anywhere in the component. `setIsActive` is also never called.
- Files: `src/pages/Home.jsx` line 65
- Impact: Dead state creates a false mental model of the component.
- Fix approach: Delete the `isActive` state declaration.

**[LOW] `motion` imported but never used in `Sidebar.jsx`**
- Issue: `src/components/Sidebar.jsx` line 1 imports `{ motion }` from framer-motion, but no `<motion.*>` element is used in the JSX.
- Files: `src/components/Sidebar.jsx` line 1
- Fix approach: Remove the import.

**[LOW] `StrictMode` imported but not used in `main.jsx`**
- Issue: `src/main.jsx` line 1 imports `StrictMode` from React, but the app renders as `<App />` with no `<StrictMode>` wrapper.
- Files: `src/main.jsx` lines 1 and 6
- Impact: The import is dead code AND the app loses the React development safety checks that StrictMode provides.
- Fix approach: Either wrap with `<StrictMode><App /></StrictMode>` or remove the import if intentionally omitted.

**[LOW] `building.avif` asset is unused**
- Issue: `src/assets/building.avif` (63 KB) exists but is only referenced in a commented-out CSS line and a commented-out App.jsx import. No live code uses it.
- Files: `src/assets/building.avif`
- Fix approach: Delete the file.

**[LOW] `react.svg` asset is unused**
- Issue: `src/assets/react.svg` exists but is never imported in any source file.
- Fix approach: Delete the file.

---

## Inconsistent Styling Approaches

**[HIGH] Plain CSS files used alongside SCSS module files (mixed paradigm)**
- Issue: The project uses three different CSS approaches with no consistent pattern:
  1. Plain component-scoped CSS files (e.g., `src/components/Carousel/Carousel.css`, `src/components/LetsConnect/letsConnect.css`)
  2. SCSS module file: `src/components/TextEffect.module.scss` (1 empty line — file exists but is blank)
  3. SCSS module file: `src/style.module.scss` (1 empty line — also blank)
- Files: All `*.css` in `src/components/`, `src/components/TextEffect.module.scss`, `src/style.module.scss`
- Impact: Future developers have no clear convention to follow. CSS modules provide local scoping; plain CSS does not — class names like `.hero-section`, `.container`, `.nav` are global and prone to collision.
- Fix approach: Choose one approach (CSS Modules or plain CSS) and standardize. Remove the two blank SCSS module files.

**[HIGH] `.hero-section` class name collision between App.css and StatsSection.css**
- Issue: `src/App.css` and `src/components/StatsSection/StatsSection.css` both define `.hero-section` with different properties (App.css defines height 602px; StatsSection.css defines `height: 120vh`). Both are globally scoped.
- Files: `src/App.css` line 172; `src/components/StatsSection/StatsSection.css` line 2
- Impact: Whichever CSS loads last wins, causing unpredictable layout in the `StatsSection`.
- Fix approach: Rename one of the selectors, or migrate to CSS Modules.

**[MEDIUM] `.logo` class defined in two places**
- Issue: `src/App.css` lines 7–16 defines `.logo` with hover/filter effects (remnant from Vite scaffold). `src/Layout/Layout.css` lines 14–19 also defines `.logo` with layout/margin rules. Both apply globally.
- Files: `src/App.css` lines 7–16; `src/Layout/Layout.css` lines 14–19
- Impact: The App.css `.logo` definition is leftover Vite template code and interferes with the real logo styling.
- Fix approach: Remove the `.logo` block from `src/App.css` entirely (it is Vite boilerplate).

**[MEDIUM] `App.css` retains Vite boilerplate CSS**
- Issue: `src/App.css` contains several Vite scaffold remnants that serve no purpose: `.logo:hover`, `.logo.react:hover`, `@keyframes logo-spin`, `.card`, `.read-the-docs` (lines 7–97).
- Files: `src/App.css` lines 7–97
- Impact: Adds unused CSS to the bundle and creates the `.logo` collision above.
- Fix approach: Delete lines 7–97 of `src/App.css`.

---

## Dark Mode / Hardcoded Color Concerns

**[HIGH] `StatsSection.css` uses hardcoded colors with no dark mode support**
- Issue: `src/components/StatsSection/StatsSection.css` uses raw hex values throughout: `color: #1a1a1a` (line 36), `color: #333333` (lines 43, 130), `color: #ff6b35` (lines 104, 122), `color: #666666` (line 137), `background-color: #f5f5f5` (line 97). None use CSS variables.
- Files: `src/components/StatsSection/StatsSection.css` lines 36, 43, 97, 104, 122, 130, 137
- Impact: The `StatsSection` heading text and stat values appear in near-black on a dark background in dark mode — potentially unreadable.
- Fix approach: Replace hardcoded values with `var(--text-color)`, `var(--background-color)`, and `var(--secondary-color)` from `src/index.css`.

**[HIGH] `ThemeSwitch.css` uses hardcoded `color: black` for the label**
- Issue: `src/components/ThemeSwitch/ThemeSwitch.css` line 9: `color: black`. The dark mode override (line 13) correctly changes it to `white`, but the base state bypasses the CSS variable `var(--text-color)`.
- Files: `src/components/ThemeSwitch/ThemeSwitch.css` lines 9, 13
- Fix approach: Replace `color: black` with `color: var(--text-color)` and remove the `.dark span` override.

**[MEDIUM] `Layout.css` sidebar uses hardcoded `background-color: darkred`**
- Issue: `src/Layout/Layout.css` line 169: `.sidebar { background-color: darkred; }`. This is a hardcoded non-theme-aware color.
- Files: `src/Layout/Layout.css` line 169
- Impact: The nav sidebar is always dark red regardless of theme, and the color itself appears to be a placeholder.
- Fix approach: Replace with a CSS variable or a deliberate brand color.

**[MEDIUM] `Layout.css` uses hardcoded `color: white` for sidebar links**
- Issue: `src/Layout/Layout.css` lines 197–200: `a { color: white; }` — a global `a` selector with hardcoded white. This overrides all anchor colors site-wide.
- Files: `src/Layout/Layout.css` line 196–200
- Impact: All links on the page inherit `color: white` in light mode, which makes them invisible against a light background unless overridden elsewhere.
- Fix approach: Scope the selector to `.sidebar a` and use a CSS variable or explicit contrast color.

**[MEDIUM] `App.css` info-panel uses hardcoded `background: white` and `color: #666`**
- Issue: `src/App.css` lines 27–28: `.info-panel { background: white; }` and `color: #666`. The location info panel (Sidebar component) ignores the theme.
- Files: `src/App.css` lines 27–32
- Fix approach: Replace with `var(--background-color)` and `var(--text-color)`.

**[LOW] `Layout.css` logo-icon uses hardcoded `background-color: #a39844`**
- Issue: `src/Layout/Layout.css` line 24: `.logo-icon { background-color: #a39844; }`. This class is not visibly used (the logo is an SVG component), but it remains.
- Files: `src/Layout/Layout.css` line 24
- Fix approach: Remove the unused `.logo-icon`, `.logo-text`, `.sub-text` rules from Layout.css (lines 21–37).

---

## Accessibility Gaps

**[HIGH] Interactive elements lack keyboard accessibility**
- Issue: The menu button in `src/Layout/Navbar.jsx` (lines 54–68) and the close button in `src/Layout/NavSideBar.jsx` (lines 38–49) use `<div onMouseDown={...}>` instead of `<button>`. These are not keyboard focusable and not announced by screen readers.
- Files: `src/Layout/Navbar.jsx` lines 54–68; `src/Layout/NavSideBar.jsx` lines 38–49
- Impact: Users navigating by keyboard or assistive technology cannot open/close the navigation.
- Fix approach: Replace both `<div>` wrappers with `<button>` elements and add `aria-label="Open menu"` / `aria-label="Close menu"`.

**[HIGH] Social icon links in NavSideBar have no href and no accessible text**
- Issue: `src/Layout/NavSideBar.jsx` lines 28–35: two `<a>` tags with no `href` attribute and no `aria-label`. The inner `<i>` Font Awesome icons have no text equivalent.
- Files: `src/Layout/NavSideBar.jsx` lines 28–35
- Impact: Links are non-navigable and invisible to screen readers.
- Fix approach: Add `href` to actual social profile URLs, add `aria-label="Instagram"` and `aria-label="Facebook"`, and optionally add `<span class="sr-only">` text.

**[HIGH] `class=` used instead of `className=` in JSX (NavSideBar)**
- Issue: `src/Layout/NavSideBar.jsx` lines 29 and 34 use `class="fa-brands fa-instagram"` and `class="fa-brands fa-facebook-f"` (HTML attribute syntax inside JSX).
- Files: `src/Layout/NavSideBar.jsx` lines 29, 34
- Impact: React will emit a warning and these classes may not apply correctly, meaning the icons may not render.
- Fix approach: Replace `class=` with `className=`.

**[MEDIUM] Map component has no keyboard interaction for markers**
- Issue: `src/components/Map.jsx` uses only a `click` event handler on `<Marker>`. There is no `keydown` handler, so keyboard users cannot select map markers.
- Files: `src/components/Map.jsx` lines 46–53
- Fix approach: Add `eventHandlers={{ keydown: ... }}` or ensure Leaflet's built-in keyboard handling is not disabled.

**[MEDIUM] Decorative/animated elements have no `aria-hidden`**
- Issue: The marquee text, animated heading characters, float image, and background overlay are rendered as meaningful elements with no `aria-hidden="true"`. Screen readers will announce every character separately through the `AnimatedHeading` span-per-character approach.
- Files: `src/components/AnimatedHeading/AnimatedHeading.jsx`; `src/components/MarqueeText/MarqueeText.jsx`; `src/components/FloationImage/FloatImg.jsx`
- Fix approach: Add `aria-hidden="true"` to purely decorative animated elements. For `AnimatedHeading`, wrap the whole container with `aria-hidden="true"` and add a visually-hidden `<span>` with the full heading text.

**[MEDIUM] Missing `<title>` — page uses Vite default**
- Issue: `index.html` line 7: `<title>Vite + React</title>`. The site still has the scaffold title.
- Files: `index.html` line 7
- Impact: Browser tabs, bookmarks, and screen reader page announcements say "Vite + React" instead of the brand name.
- Fix approach: Change to `<title>Hometrust Living Ltd</title>` and consider dynamic titles per route.

**[LOW] `<img fill={true}>` is invalid HTML**
- Issue: `src/pages/Home.jsx` line 92: `<img src={building} fill={true} alt="building" />`. `fill` is a Next.js Image prop, not a valid HTML `<img>` attribute.
- Files: `src/pages/Home.jsx` line 92
- Impact: React will pass `fill="true"` as a DOM attribute, causing a browser warning. No visual effect.
- Fix approach: Remove the `fill={true}` prop.

---

## Performance Concerns

**[HIGH] 5.8 MB of JPG car images bundled but never used**
- Issue: `src/assets/car1.jpg` (2.1 MB), `car2.jpg` (531 KB), `car3.jpg` (3.2 MB) are imported in `src/Data/data.js` lines 1–3 but never used.
- Files: `src/Data/data.js` lines 1–3; `src/assets/car1.jpg`, `src/assets/car2.jpg`, `src/assets/car3.jpg`
- Impact: Vite includes these in the build output, inflating the bundle by ~5.8 MB.
- Fix approach: Remove the imports. If the images are needed in the future, import them at point of use.

**[HIGH] Hero image is a 1 MB unoptimized PNG**
- Issue: `src/assets/Hero Image1.png` is 1.0 MB. It is loaded as the primary above-the-fold image.
- Files: `src/assets/Hero Image1.png`; `src/pages/Home.jsx` line 8
- Impact: Significantly increases LCP (Largest Contentful Paint). No `loading="eager"` or `fetchpriority="high"` is set; no responsive sizes.
- Fix approach: Convert to WebP/AVIF, resize to appropriate display dimensions (~1920px max), add `fetchpriority="high"` to the hero `<img>`.

**[HIGH] Autoplay video loaded from an external CDN with no preload strategy**
- Issue: `src/pages/Home.jsx` lines 129–142: a full `autoPlay loop muted playsInline` video loads from `https://cms.shantaholdings.com/media/...`. No `preload` attribute is set; no loading state or fallback poster image.
- Files: `src/pages/Home.jsx` lines 138–141
- Impact: The video starts downloading immediately on page load (likely 10–50 MB), competing with critical resources.
- Fix approach: Add `preload="none"` or `preload="metadata"`, add a `poster` image, and consider lazy-loading the video section with an Intersection Observer.

**[MEDIUM] No route-level code splitting — all pages loaded eagerly**
- Issue: `src/App.jsx` imports all six page components at the top level (lines 60–66). All page code is bundled into a single JS chunk even though five of the six pages are stubs.
- Files: `src/App.jsx` lines 60–66
- Fix approach: Use `React.lazy()` and `<Suspense>` for each route import. This is especially important once pages are fully implemented.

**[MEDIUM] `createBrowserRouter` called inside component body on every render**
- Issue: `src/App.jsx` line 70: `const router = createBrowserRouter([...])` is called inside the `App` component function. This recreates the router object on every re-render.
- Files: `src/App.jsx` lines 69–86
- Impact: While React Router internally handles this, it is an anti-pattern that can cause subtle re-render issues and wastes CPU on each render cycle.
- Fix approach: Move `createBrowserRouter(...)` outside the `App` component (module-level constant).

**[MEDIUM] `LocomotiveScroll` initialized without cleanup**
- Issue: Both `src/pages/Home.jsx` (lines 24–28) and `src/components/TextEffect/TextEffect.jsx` (lines 5–9) dynamically import and initialize `LocomotiveScroll` in a `useEffect` with no cleanup or reference stored.
- Files: `src/pages/Home.jsx` lines 24–28; `src/components/TextEffect/TextEffect.jsx` lines 5–9
- Impact: Each time the component mounts, a new LocomotiveScroll instance is created and leaked. In React StrictMode (when reenabled) effects run twice, creating two instances.
- Fix approach: Store the instance and call `locomotiveScroll.destroy()` in the effect cleanup function.

**[LOW] `setTimeout` in Carousel has no cleanup**
- Issue: `src/components/Carousel/Carousel.jsx` line 20: `setTimeout(() => setShowTitle(true), 500)` has no corresponding `clearTimeout` in the useEffect cleanup.
- Files: `src/components/Carousel/Carousel.jsx` lines 19–21
- Impact: If the component unmounts within 500ms, the timeout still fires and attempts to call `setShowTitle` on an unmounted component.
- Fix approach: `return () => clearTimeout(timeoutId)` where `timeoutId` is the return value of `setTimeout`.

**[LOW] Font Awesome loaded from CDN with SRI hash**
- Issue: `index.html` loads Font Awesome via a CDN `<link>` tag. Only 2 icons are used (Instagram, Facebook in `NavSideBar`). The full Font Awesome CSS is ~400 KB.
- Files: `index.html` lines 8–13
- Fix approach: Use individual SVG icons or the `@fortawesome/react-fontawesome` package with tree-shaking to load only the two icons needed.

---

## Architectural Smells

**[HIGH] Duplicate stats components with conflicting data**
- Issue: Two independent stats implementations exist side-by-side:
  - `src/components/StatsSection/` — shows 6 stats (0.37M+ total area, 15 years, 32 projects, 18 completed, 400+ clients, 0.21M+ pipeline). Uses locally-hosted image.
  - `src/components/HomeStats/HomeStats.jsx` — shows different stats (10M+ area, 100+ projects, 20 years, 1400+ clients, 52 completed). Uses external Shanta Holdings CDN images and data.
- Files: `src/components/StatsSection/StatsSection.jsx`; `src/components/HomeStats/HomeStats.jsx`
- Impact: Stats are contradictory (32 vs 100 projects, 400 vs 1400 clients, 0.37M vs 10M area). Only `StatsSection` is rendered; `HomeStats` has wrong data and missing imports.
- Fix approach: Decide on the correct data, consolidate into one component, delete `HomeStats`.

**[MEDIUM] Import path casing inconsistency — will break on Linux**
- Issue: `src/pages/Home.jsx` line 19: `import location from '../data/locations'` (lowercase `data`). The actual directory is `src/Data/` (uppercase `D`).
- Files: `src/pages/Home.jsx` line 19; actual path `src/Data/locations.js`
- Impact: macOS is case-insensitive so it works locally, but Linux (production/CI environments) is case-sensitive and this import will fail at build time with `Module not found`.
- Fix approach: Change the import to `'../Data/locations'`.

**[MEDIUM] Data uses placeholder/test content in production-facing code**
- Issue: `src/Data/data.js` uses placeholder titles: `'gojo'`, `'robot'`, `'mojo'` for carousel items (lines 9, 14, 19). `src/Data/locations.js` uses `'Project A'`, `'Project B'` with generic descriptions.
- Files: `src/Data/data.js` lines 9, 14, 19; `src/Data/locations.js`
- Impact: These values are rendered directly to end users in the `Carousel` (`project-title` heading) and Map sidebar.
- Fix approach: Replace with real project names and descriptions, or mark clearly as mock data.

**[MEDIUM] `videos` array items have inconsistent schema**
- Issue: `src/Data/data.js`: the first `videos` entry uses the key `title` (line 27), but the second and third entries use `projectName` (lines 32, 37). `Carousel.jsx` line 69 reads `videos[vidIndex].title`, so `'Project 2'` and `'Project 3'` alt text will be `undefined`.
- Files: `src/Data/data.js` lines 27–38; `src/components/Carousel/Carousel.jsx` line 69
- Impact: `alt` attribute is `undefined` for two of three carousel secondary images — accessibility and SEO issue.
- Fix approach: Standardize the schema: use `title` for all video entries.

**[LOW] `api-development-and-authentication` directory is an abandoned Next.js project**
- Issue: `/api-development-and-authentication/` contains only a `.next/` build trace with no source files. It appears to be a discarded experiment sitting in the project root.
- Files: `api-development-and-authentication/.next/trace`
- Impact: Pollutes the repository root. Vite may attempt to process files within it.
- Fix approach: Delete the directory or move it to a separate repository.

**[LOW] Google Fonts `preconnect` tags are triplicated**
- Issue: `index.html` lines 14–19 include `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com">` each three times.
- Files: `index.html` lines 14–19
- Impact: Redundant connections; minor performance overhead; code smell.
- Fix approach: Keep exactly one set of `preconnect` tags for each origin.

**[LOW] Default Vite favicon still in use**
- Issue: `index.html` line 5: `<link rel="icon" href="/vite.svg" />`. The Vite logo appears as the browser favicon.
- Files: `index.html` line 5; `public/vite.svg`
- Fix approach: Replace with the brand logo or a custom favicon derived from the Hometrust SVG logo.

---

## Missing `prefers-reduced-motion` Support

**[MEDIUM] All animations play regardless of OS accessibility preference**
- Issue: `src/App.css` line 85 has a single `@media (prefers-reduced-motion: no-preference)` block for the Vite boilerplate logo spin — but none of the real animations (framer-motion page transitions, GSAP scroll effects, marquee, carousel autoplay, count-up) check for this preference.
- Files: `src/pages/Home.jsx` (GSAP, framer-motion); `src/components/Carousel/Carousel.jsx` (autoplay, framer-motion); `src/components/MarqueeText/MarqueeText.jsx` (GSAP); `src/components/AnimatedHeading/AnimatedHeading.jsx` (framer-motion)
- Impact: Users with vestibular disorders who set "Reduce Motion" in their OS will still experience all animations.
- Fix approach: In framer-motion components, use the `useReducedMotion()` hook to disable or simplify transitions. In GSAP, check `window.matchMedia('(prefers-reduced-motion: reduce)')` before registering animations.

---

*Concerns audit: 2026-04-19*
