# TESTING.md — Testing & Quality Tooling

## Test Coverage

**Current state: No tests exist.**

There are zero test files in the codebase. No `*.test.js`, `*.spec.js`, `*.test.jsx`, or `__tests__/` directories were found anywhere under `src/`.

---

## Testing Libraries Installed

None. The `package.json` has no testing framework dependencies:
- No Vitest
- No Jest
- No React Testing Library
- No Cypress / Playwright

---

## Linting — ESLint

**Config file:** `eslint.config.js`

Uses the modern flat config format. Key setup:
- `@eslint/js` recommended rules
- `eslint-plugin-react-hooks` — enforces Rules of Hooks
- `eslint-plugin-react-refresh` — warns on non-component exports (for Vite HMR)
- Target: browser globals, ES2020

Notable: no TypeScript linting (project is plain JS/JSX).

---

## Formatting — Prettier

**Config file:** `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

---

## Build & Type Checking

- **Build tool:** Vite 6 with `@vitejs/plugin-react-swc` (SWC compiler — no Babel)
- **No TypeScript** — project is plain `.jsx` / `.js`, no `tsconfig.json`
- **No type checking step** in the build pipeline
- Build command: `npm run build` (Vite production build)
- Dev command: `npm run dev`
- Preview command: `npm run preview`

---

## Recommendations (if tests are added later)

| Tool | Purpose |
|------|---------|
| Vitest | Unit/integration tests (native Vite integration) |
| React Testing Library | Component rendering tests |
| Playwright | E2E tests for page navigation and animations |
