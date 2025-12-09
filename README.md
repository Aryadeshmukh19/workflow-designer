🚀 **Workflow Designer – Frontend Internship Assignment - TREDENCE**

A lightweight, modular workflow builder UI built using React, TypeScript, React Flow, Zustand, TailwindCSS, and a minimal Node.js REST API backend.

This project demonstrates the ability to take a real-world requirement and turn it into a functional, polished UI system.

✨ **Features**
🔹 1. Drag-and-Drop Workflow Builder

Add nodes by dragging from the left palette

Smooth animated node mounting using Framer Motion

Custom node cards with icons, shadows, and selection states

🔹 2. Node Inspector Panel

Select a node to edit its properties

Automated nodes support action assignment

Form updates dynamically based on selected node

🔹 3. REST API Integration

The frontend communicates with the backend through two endpoints:

GET /api/automations

Fetches available automated actions.

POST /api/simulate

Sends { nodes, edges } and returns a mock execution result.

All networking is done using Axios.

🔹 4. Simulation Engine

Runs workflow logic through backend

Displays results in a smooth toast animation

Useful for debugging or validating graph structure

🔹 5. JSON Import / Export

Export workflow to a .json file

Import an existing workflow and continue editing

🔹 6. Polished UI

Framer Motion animations

Lucide icons

TailwindCSS v4 styling

Three-panel responsive layout (Sidebar → Canvas → Inspector)

Improved drag, zoom, and pan behavior

🧱 **Tech Stack**

Frontend:

React 18

TypeScript

React Flow

Zustand (state management + undo/redo support)

TailwindCSS 4

Framer Motion

Axios

Vite

Backend:

Node.js

Express

CORS enabled

Mock REST API for workflow simulation

📁 **Folder Structure**
workflow-designer/
 ├── src/
 │   ├── api/           # API client (axios)
 │   ├── components/    # Canvas, CustomNode, Inspector, etc
 │   ├── stores/        # Zustand store + history
 │   ├── index.css
 │   ├── App.tsx
 │   └── main.tsx
 ├── server/
 │   └── index.js       # Mock backend with REST API
 ├── public/
 ├── package.json
 └── vite.config.ts

▶️ Running the Project
Start the Backend
cd server
PORT=5174 node index.js

Start the Frontend
npm install
npm run dev


Frontend runs at:

👉 http://localhost:5173

🧪 Simulation Example

Request Body (sent to /api/simulate):

{
  "nodes": [
    { "id": "1", "type": "custom", "data": { "label": "Start" } }
  ],
  "edges": []
}


Example Response:

{
  "status": "ok",
  "processedNodes": 1
}
