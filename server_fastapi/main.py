from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn

app = FastAPI()

class Node(BaseModel):
    id: str
    position: Dict[str, Any] = {}
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    id: str = None
    source: str
    target: str

class GraphPayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/api/automations')
def get_automations():
    return [
        {"id": "send-email", "name": "Send Email", "params": [{"key":"to","type":"string","required":True}]},
        {"id": "create-ticket", "name": "Create Ticket", "params": [{"key":"priority","type":"string"}]}
    ]

def detect_cycle(nodes, edges):
    adj = {n.id: [] for n in nodes}
    for e in edges:
        adj.setdefault(e.source, []).append(e.target)
    visited = set(); stack = set()
    def dfs(u):
        if u in stack: return True
        if u in visited: return False
        visited.add(u); stack.add(u)
        for v in adj.get(u, []):
            if dfs(v): return True
        stack.remove(u); return False
    for n in nodes:
        if dfs(n.id): return True
    return False

def simulate(nodes, edges):
    incoming = {n.id: 0 for n in nodes}
    for e in edges:
        incoming[e.target] = incoming.get(e.target, 0) + 1
    queue = [n.id for n in nodes if incoming.get(n.id,0)==0]
    adj = {n.id: [] for n in nodes}
    for e in edges:
        adj.setdefault(e.source, []).append(e.target)
    steps = []; seen=set()
    while queue:
        cur = queue.pop(0)
        if cur in seen: continue
        seen.add(cur)
        node = next((n for n in nodes if n.id==cur), None)
        steps.append({"id": cur, "label": getattr(node.data,'get', lambda k, d=None: cur)('label',''), "status":"ok"})
        for nb in adj.get(cur, []):
            incoming[nb]-=1
            if incoming[nb]<=0: queue.append(nb)
    for n in nodes:
        if n.id not in seen: steps.append({"id": n.id, "label": n.data.get('label',''), "status":"skipped"})
    return steps

@app.post('/api/simulate')
def post_simulate(payload: GraphPayload):
    if detect_cycle(payload.nodes, payload.edges):
        return {"ok": False, "error": "cycle detected"}
    steps = simulate(payload.nodes, payload.edges)
    return {"ok": True, "steps": steps}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
