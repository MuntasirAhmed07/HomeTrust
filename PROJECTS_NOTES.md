# Projects Feature — Developer Notes

## What Was Added

### New Files

| File | Purpose |
|---|---|
| `public/data/projects.json` | Static data source for all projects |
| `public/.htaccess` | Apache SPA routing + caching + security (for cPanel deployment) |
| `src/pages/ProjectsListing.jsx` + `.css` | `/projects` listing page |
| `src/pages/ProjectDetail.jsx` + `.css` | `/projects/:id` detail page |
| `src/components/FilterBar/FilterBar.jsx` + `.css` | Filter bar with 3 dropdowns + search |
| `src/components/ProjectCard/ProjectCard.jsx` + `.css` | Card component (default + overlay variants) |
| `src/components/Gallery/Gallery.jsx` + `.css` | Simple image gallery with prev/next arrows |

### Modified Files

| File | Change |
|---|---|
| `src/App.jsx` | Added 2 imports + 2 route objects (`projects`, `projects/:id`) inside the existing `children[]` array |

---

## What Was Reused vs. Created New

- **MapFilter** — NOT reused. It is map-specific (hardcoded arrays, upward dropdowns, absolute positioning relative to map canvas). `FilterBar` replicates its visual style (dark background, white text, dividers) but is a standalone component with dynamic props and downward-opening dropdowns.
- **Carousel** — NOT reused. It requires both `images` and `videos` props and is a full-screen hero carousel with Framer Motion animations. `Gallery` is a new, simpler component.

---

## How to Test Locally

```bash
npm run dev
```

Then visit:
- `http://localhost:5173/projects` — listing page with 4 project cards
- `http://localhost:5173/projects/ayesha` — detail page for Ayesha
- `http://localhost:5173/projects/bari-cottage` — detail page for Bari Cottage
- `http://localhost:5173/projects/invalid` — should show "Project not found" (with Header/Footer still visible)

Test filter behaviour on `/projects`:
- Open "All Locations" → select "Mirpur" → only Mirpur projects show
- Open "Project Status" → select "Ongoing" → filters further
- Use search box → type "ayesha" → only Ayesha card shows
- Click × on any active filter → clears that filter

---

## How to Add a New Project

1. Open `public/data/projects.json`
2. Add a new object to the `"projects"` array following this schema:

```json
{
  "id": "unique-kebab-case-id",
  "name": "Short Name",
  "fullName": "Hometrust Full Name",
  "shortAddress": "Short address for cards",
  "fullAddress": "Full address for detail page",
  "status": "Ongoing",
  "type": "Residential",
  "location": "Mirpur",
  "mainImage": "/images/your-project-main.jpg",
  "thumbnailImage": "/images/your-project-thumb.jpg",
  "gallery": ["/images/your-project-1.jpg", "/images/your-project-2.jpg"],
  "details": {
    "architect": "Name",
    "land": "1800 sft (2.50 katha)",
    "stories": "G + 7",
    "flats": "7",
    "basements": "0",
    "carParking": "5",
    "orientation": "North Faced",
    "frontRoadWidth": "20' Wide",
    "apartmentSize": "Single Unit-1600 Sft"
  },
  "map": {
    "embedUrl": "REPLACE_WITH_REAL_GOOGLE_MAPS_EMBED_URL"
  }
}
```

No code changes needed — the new project appears automatically on `/projects`.

---

## Image Setup

Drop images into `public/images/` so that paths in JSON resolve correctly:

```
public/
  images/
    ayesha-main.jpg
    ayesha-thumb.jpg
    ayesha-1.jpg
    ayesha-2.jpg
    bari-cottage-main.jpg
    ...
```

The path `/images/ayesha-main.jpg` in JSON maps to `public/images/ayesha-main.jpg`.

Images that fail to load show a grey placeholder automatically (no broken image icons).

---

## When Ready to Deploy to cPanel

1. Run the build:
   ```bash
   npm run build
   ```

2. Verify `dist/.htaccess` was copied — Vite copies everything from `public/` into `dist/`, including `.htaccess`.

3. Upload the **contents** of `dist/` (not the `dist/` folder itself) to your cPanel `public_html/`:
   ```
   dist/index.html        → public_html/index.html
   dist/assets/           → public_html/assets/
   dist/.htaccess         → public_html/.htaccess
   dist/data/             → public_html/data/
   dist/images/           → public_html/images/
   ```

4. In cPanel File Manager, make sure **"Show Hidden Files"** is enabled so `.htaccess` is visible and uploads correctly.

5. Test by visiting `/projects/ayesha` directly in the browser and refreshing — it should **not** return a 404.

---

## What the .htaccess Does

The `.htaccess` file is required for Apache-based hosting (cPanel). Without it, refreshing any sub-route (e.g. `/projects/ayesha`) gives a 404 because Apache looks for a real file at that path — which doesn't exist.

The `RewriteRule` at the top routes all requests that don't match a real file or directory back to `index.html`, letting React Router handle the URL client-side.

The file also enables:
- **Gzip compression** via `mod_deflate` — faster page loads
- **Browser caching** via `mod_expires` — assets cached for 1–6 months, HTML never cached (so updates deploy immediately)
- **Security headers** — prevents MIME sniffing, clickjacking, and leaks the referrer
- **`Options -Indexes`** — prevents Apache from listing directory contents if no index file is present
