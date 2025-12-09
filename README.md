🚀 **Workflow Designer – Frontend Internship Assignment- TREDENCE**

A modular, interactive Workflow Builder UI built with React, TypeScript, React Flow, Zustand, TailwindCSS, and a REST API backend.
This project demonstrates practical frontend engineering skills by converting functional requirements into a polished, production-style interface.

✨ **Features Overview**

🔹 1. Drag-and-Drop Workflow Canvas

Add nodes by dragging from the left palette

Smooth animated node entry using Framer Motion

Custom-styled node cards (icons, shadows, hover, selected states)

🔹 2. Node Inspector (Right Sidebar)

Edit node label and type-specific metadata

Automated nodes support predefined actions

Live-updating form based on selected node

🔹 3. REST API Integration

The frontend interacts with a mock backend via:

GET /api/automations

Returns available automation actions.

POST /api/simulate

Accepts { nodes, edges } and returns a mock workflow execution result.

Networking handled through Axios.

🔹 4. Simulation Engine

Runs workflow on backend

Returns JSON simulation result

Custom toast UI displays result

Useful for validator/debug flows

🔹 5. Workflow Export / Import

Export workflow graph to JSON

Import previous workflows to continue editing

🔹 6. Polished UI

Fully responsive layout

Animated transitions

Lucide icons

TailwindCSS v4 design system

Smooth panning, zooming, snapping behavior

🧱 **Tech Stack**

Layer	Technologies
Frontend	React 18, TypeScript, React Flow, Zustand, Axios, Vite, TailwindCSS 4, Framer Motion
Backend	Node.js, Express, CORS
Build Tools	Vite, ES Modules

📁 **Folder Structure**
```md
workflow-designer/
 ├── src/
 │   ├── api/              # Axios REST API client
 │   ├── components/       # Canvas, CustomNode, NodeForm, Toast, Sidebar
 │   ├── stores/           # Zustand store + undo/redo history
 │   ├── index.css         # Global styles + TailwindCSS v4 config
 │   ├── App.tsx           # App layout (Sidebar → Canvas → Inspector)
 │   └── main.tsx          # Entry point
 │
 ├── server/
 │   └── index.js          # Mock backend (GET /automations, POST /simulate)
 │
 ├── public/               # Static assets
 ├── package.json          # Dependencies + scripts
 └── vite.config.ts        # Vite configuration
```

▶️ R**unning the Project**
1. Start Backend
cd server
PORT=5174 node index.js

2. Start Frontend
npm install
npm run dev


App runs on:
👉 http://localhost:5173

Backend runs on:
👉 http://localhost:5174

🧪 **Simulation Request Example**
``` md 
Request Body
{
  "nodes": [
    { "id": "1", "type": "custom", "data": { "label": "Start" } }
  ],
  "edges": []
}

Response Example
{
  "status": "ok",
  "processedNodes": 1
}
```
## 🎥 Demo
![Workflow Demo](demo.gif)
