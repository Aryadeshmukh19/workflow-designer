// src/api/client.ts
import axios from "axios";

// IMPORTANT: backend is running on PORT 5174
// If you start backend on a different port, change this line ONLY.
const API = axios.create({
  baseURL: "http://localhost:5174",
});

// Fetch list of automation actions (for Automated nodes)
export const getAutomations = async () => {
  const res = await API.get("/api/automations");
  return res.data;
};

// Run simulation with graph data
export const simulateWorkflow = async (payload: any) => {
  const res = await API.post("/api/simulate", payload);
  return res.data;
};

export default API;
