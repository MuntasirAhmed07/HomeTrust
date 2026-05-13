# External Integrations

**Analysis Date:** 2026-04-19

---

## Fonts

**Provider:** Google Fonts (loaded via CDN in `index.html`)

**Fonts loaded:**
- `Inter` — variable font, italic & non-italic, optical size 14–32, weights 100–900
- `Lato` — weights 100, 300, 400, 700, 900 (regular + italic)
- `Raleway` — variable font, italic & non-italic, weights 100–900

**Loading strategy:** `display=swap` (via `@import` URL parameter), preconnect hints to `https://fonts.googleapis.com` and `https://fonts.gstatic.com`

**Source URL:**
```
https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@...&family=Lato:...&family=Raleway:...&display=swap
```

---

## Icon Libraries

**Provider:** Font Awesome 6 (loaded via CDN in `index.html`)

**Version:** 6.0.0

**CDN URL:**
```
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css
```

**Icons used:**
- `fa-brands fa-instagram` — Instagram icon in sidebar social links (`src/Layout/NavSideBar.jsx`)
- `fa-brands fa-facebook-f` — Facebook icon in sidebar social links (`src/Layout/NavSideBar.jsx`)

---

## Mapping Services

**Map Tiles:**
- Provider: OpenStreetMap
- Tile URL: `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
- Used in: `src/components/Map.jsx` via React Leaflet `<TileLayer>`
- Default map center: `[23.8103, 90.4125]` (Dhaka, Bangladesh), zoom level 13

**Marker Shadow Asset:**
- Source: unpkg CDN
- URL: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png`
- Used in: `src/components/Map.jsx` as `shadowUrl` for the custom Leaflet `Icon`

---

## External Media / CMS

**Shanta Holdings CMS** (`cms.shantaholdings.com`)

Used as the source for remotely hosted video and image assets:

| Asset Type | URL Pattern | Used In |
|---|---|---|
| Hero video (MP4) | `https://cms.shantaholdings.com/media/media/SHL_Final_Without_Super-28.02.24_2.mp4` | `src/pages/Home.jsx` |
| Building image (AVIF/PNG, responsive) | `https://cms.shantaholdings.com/images/...` | `src/components/HomeStats/HomeStats.jsx` |

The CMS serves images with Wagtail-style image rendition URLs (e.g., `/images/{signature}=/149/width-800%7Cformat-avif/image.png`). The `HomeStats` component uses `<picture>` elements with multiple `<source>` breakpoints for responsive delivery, falling back from AVIF to PNG.

**External Project Link:**
- URL: `https://shantaholdings.com/`
- Used in: `src/components/Carousel/Carousel.jsx` as the "View Project" anchor link

---

## Stock Media (Pexels)

**Provider:** Pexels (free stock photo/video platform)

**Used as placeholder/demo content in:** `src/Data/data.js`

**Image URLs:**
```
https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
```

**Video thumbnail URLs (used as `video` field in data, actually image previews):**
```
https://images.pexels.com/videos/1409899/free-video-1409899.jpg?auto=compress&cs=tinysrgb&w=1200
https://images.pexels.com/videos/1437396/free-video-1437396.jpg?auto=compress&cs=tinysrgb&w=1200
https://images.pexels.com/videos/2888383/free-video-2888383.jpg?auto=compress&cs=tinysrgb&w=1200
```

These are rendered inside the Carousel component (`src/components/Carousel/Carousel.jsx`) as `<motion.img>` elements.

---

## Authentication & APIs

**Authentication:** None detected — no auth provider, no login flow, no API tokens in source files.

**Backend API calls:** None detected — no `fetch`, `axios`, or API client calls in any source file. This is a static front-end / design prototype.

---

## Data Storage

**Databases:** None in active use.

**Notable file:** `src/playground-1.mongodb.js` — a VS Code MongoDB Playground file (developer tooling scratch pad, not used by the application). It targets a local `mongodbVSCodePlaygroundDB` database. This indicates MongoDB was explored but is not wired into the app.

**Local persistence:**
- `localStorage` — used only for theme preference (`key: 'theme'`, `value: 'light' | 'dark'`) in `src/components/ThemeSwitch/ThemeSwitch.jsx`

---

## CDN Assets (External URLs Summary)

| Service | URL | Purpose |
|---|---|---|
| Google Fonts | `https://fonts.googleapis.com` | Web font delivery |
| Cloudflare CDN | `https://cdnjs.cloudflare.com` | Font Awesome icons |
| OpenStreetMap | `https://tile.openstreetmap.org` | Map tile images |
| unpkg | `https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png` | Leaflet marker shadow |
| Shanta Holdings CMS | `https://cms.shantaholdings.com` | Video and building images |
| Pexels | `https://images.pexels.com` | Stock photo/video placeholders |

---

## Monitoring & Observability

**Error Tracking:** None detected.
**Analytics:** None detected.
**Logging:** `console.log` only (MongoDB playground file).

---

## CI/CD & Deployment

**Hosting:** Not configured — no deployment config files detected (no `vercel.json`, `netlify.toml`, `Dockerfile`, etc.)
**CI Pipeline:** None detected.

---

## Environment Configuration

**`.env` files:** Not present (no `.env` or `.env.*` files found).
**Required environment variables:** None — no `import.meta.env` or `process.env` references found in source files. All external URLs are hardcoded directly in source.

---

## Social / External Links

| Platform | Usage | File |
|---|---|---|
| Instagram | Icon link in sidebar (no `href` set — placeholder) | `src/Layout/NavSideBar.jsx` |
| Facebook | Icon link in sidebar (no `href` set — placeholder) | `src/Layout/NavSideBar.jsx` |
| Shanta Holdings website | "View Project" link in Carousel | `src/components/Carousel/Carousel.jsx` |

---

*Integration audit: 2026-04-19*
