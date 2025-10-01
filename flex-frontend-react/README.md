# Flex Frontend (React + React Router)

This folder contains the React frontend for the Property Reviews Dashboard. The project uses React Router's dev/build/serve tooling (Vite under the hood) and TypeScript.

Quick overview

- Dev server: `npm run dev` (uses `@react-router/dev`)
- Build: `npm run build` (uses `react-router build`)
- Start/Serve (production server): `npm run start` (uses `@react-router/serve`)
- Type generation / typecheck: `npm run typecheck`

Getting started (Windows / PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm run dev
```

This uses `@react-router/dev`. Open the URL shown in the terminal (commonly `http://localhost:5173`).

3. Build for production

```powershell
npm run build
```

This runs `react-router build` and produces server + client artifacts under `build/`.

4. Serve the production build locally

```powershell
npm run start
```

Environment variables

- The frontend reads `VITE_API_BASE_URL` (via `import.meta.env.VITE_API_BASE_URL`) to configure the API base URL. If not set it defaults to `http://localhost:3001/api` in the axios client: `app/lib/api/axios.ts`.
- Add a `.env` file at the project root (this file is gitignored). Example:

```env
# API base (change if backend runs at a different host/port)
VITE_API_BASE_URL=http://localhost:3001/api
```

Key files

- `app/root.tsx` — React entry / router
- `app/lib/api/axios.ts` — axios instance and API_BASE_URL (search for `VITE_API_BASE_URL`)
- `vite.config.ts` — Vite/react-router configuration

Scripts (from package.json)

- `dev` — start the dev server (`react-router dev`)
- `build` — build server + client (`react-router build`)
- `start` — serve the built server (`react-router-serve ./build/server/index.js`)
- `typecheck` — run react-router type generation and TypeScript check

Troubleshooting & notes

- If the app cannot reach the backend, ensure `VITE_API_BASE_URL` is set and reachable.
- If you change env vars, restart the dev server because Vite injects import.meta.env at startup.
- If you see TypeScript errors after dependency changes, restart your editor's TypeScript server.
- The project uses Tailwind via `@tailwindcss/vite`; if you change Tailwind config, restart the dev server.

Advanced: deploying the built server

The `react-router build` produces a `build/server` folder which can be started with `node build/server/index.js` (or via `npm run start` which wraps `react-router-serve`). Containerize the app by building and copying the `build` output into a small Node image.
