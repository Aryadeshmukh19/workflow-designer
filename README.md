# Workflow Designer — Frontend Internship Project

**Stack:** Vite + React + TypeScript • TailwindCSS • React Flow • Zustand • Express / FastAPI • Rust (validator)

A compact, demonstrable prototype of an HR Workflow Designer with drag-and-drop canvas, custom nodes, editable node forms, mock REST API simulation, and tooling to validate/export workflows. This repo intentionally highlights bonus skills (Tailwind, Zustand, Node API, Rust validator).

---

## Quick start (recommended: Express API)

1. Install dependencies (frontend + server):
```bash
# root
npm install
# server
cd server && npm install
```

2. Run the mock API (Express):
```bash
cd server
node index.js
# server runs on http://localhost:5173
```

3. Start the frontend (new terminal/tab):
```bash
npm run dev
# open http://localhost:5173
```

4. Use the app:
- Drag nodes from the left sidebar to the canvas
- Connect nodes, click nodes to edit label or set an automation (for Automated nodes)
- Click **Run Simulation** in the right panel to POST the workflow to the mock API and receive step-by-step results
- Click **Export JSON** to download your workflow

---

## Docker (one-command local run)

A `docker-compose.yml` is included to run the frontend and Express API together.

```bash
docker-compose up --build
# frontend on 5174, api on 5173 (mapped inside compose)
```

---

## Project highlights (for reviewer)
- Drag & drop + React Flow canvas with MiniMap and undo/redo controls
- Custom node component and NodeForm with dynamic action params for Automated nodes
- Zustand for state management; clean small store API
- Express simulation engine that detects cycles and traverses the graph deterministically
- FastAPI alternative included for Python preference
- Rust Cargo project (`rust-utils`) with cycle-checker utility
- Example workflow ready to load (`/examples/example1.json`)
- Export/Import workflow JSON support

---

## Files of interest
- `src/components/Canvas.tsx` — React Flow canvas (mini-map, undo/redo)
- `src/components/NodeForm.tsx` — dynamic forms and automation params
- `src/stores/useStore.ts` — Zustand store
- `server/index.js` — Express simulation
- `server_fastapi/main.py` — FastAPI alternative
- `rust-utils/` — Rust validator project

---

## How to present (5-minute demo)
1. Show the canvas and drag a Start → Task → Automated → End
2. Click Automated node and choose an action (Send Email), fill params
3. Run Simulation — show the returned steps
4. Export JSON and run Rust validator locally (optional)
5. Open README and point to `APPLICATION_REPLY.txt` showing final submission text

---

## Next improvements (if you have more time)
- Full-form validation & dynamic param types (dates, numbers, enums)
- Server-side simulation with stateful execution logs
- Undo/redo persistence, import presets, multi-user collaboration
- Unit tests + GitHub Actions CI, prettier/eslint and storybook

---

