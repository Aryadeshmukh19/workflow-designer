const express = require('express')
const cors = require('cors')   
const app = express()
app.use(cors())
app.use(express.json())

function detectCycle(nodes, edges) {
  const adj = {}
  nodes.forEach(n => adj[n.id] = [])
  edges.forEach(e => { if (adj[e.source]) adj[e.source].push(e.target) })
  const visited = {}, recStack = {}
  function dfs(u) {
    if (!visited[u]) {
      visited[u] = true; recStack[u] = true
      for (const v of adj[u]) {
        if (!visited[v] && dfs(v)) return true
        else if (recStack[v]) return true
      }
    }
    recStack[u] = false; return false
  }
  for (const n of nodes) { if (dfs(n.id)) return true }
  return false
}

function simulate(nodes, edges) {
  // simple deterministic simulation: topological-like traversal starting from nodes without incoming edges
  const incoming = {}
  nodes.forEach(n => incoming[n.id] = 0)
  edges.forEach(e => { incoming[e.target] = (incoming[e.target] || 0) + 1 })
  const queue = nodes.filter(n => (incoming[n.id] || 0) === 0).map(n=>n.id)
  const adj = {}
  nodes.forEach(n => adj[n.id] = [])
  edges.forEach(e => { if (adj[e.source]) adj[e.source].push(e.target) })

  const steps = []
  const seen = new Set()
  while (queue.length) {
    const cur = queue.shift()
    if (seen.has(cur)) continue
    seen.add(cur)
    const node = nodes.find(n=>n.id===cur) || { id: cur, data: { label: cur } }
    steps.push({ id: node.id, label: node.data?.label || node.id, status: 'ok' })
    for (const nb of adj[cur] || []) {
      incoming[nb] = incoming[nb] - 1
      if (incoming[nb] <= 0) queue.push(nb)
    }
  }

  // mark unreachable nodes as skipped
  for (const n of nodes) {
    if (!seen.has(n.id)) steps.push({ id: n.id, label: n.data?.label || n.id, status: 'skipped' })
  }
  return steps
}

app.get('/api/automations', (req, res) => {
  res.json([
    { id: 'send-email', name: 'Send Email', params: [{ key: 'to', type: 'string', required: true }]},
    { id: 'create-ticket', name: 'Create Ticket', params: [{ key: 'priority', type: 'string' } ]}
  ])
})

app.post('/api/simulate', (req, res) => {
  const payload = req.body
  const nodes = payload.nodes || []
  const edges = payload.edges || []
  if (detectCycle(nodes, edges)) {
    return res.json({ ok: false, error: 'cycle detected' })
  }
  const steps = simulate(nodes, edges)
  res.json({ ok: true, steps, payloadReceived: payload })
})

const port = process.env.PORT || 5173
app.listen(port, ()=> console.log('Mock API running on', port))
