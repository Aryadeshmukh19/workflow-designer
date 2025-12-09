import create from 'zustand'
import { Node, Edge } from 'reactflow'

type State = {
  nodes: Node[],
  edges: Edge[],
  selected: Node | null,
  setNodes: (fn: any) => void,
  setEdges: (fn: any) => void,
  selectNode: (n: Node | null) => void,
  history: any[],
  historyIndex: number,
  pushHistory: () => void,
  undo: () => void,
  redo: () => void,
}

const useStore = create<State>((set, get) => ({
  nodes: [
    { id: '1', position: { x: 50, y: 50 }, data: { id: '1', label: 'Start', type: 'input' }, type: 'custom' },
  ],
  edges: [],
  selected: null,
  setNodes: (fn) => set((s) => ({ nodes: typeof fn === 'function' ? fn(s.nodes) : fn })),
  setEdges: (fn) => set((s) => ({ edges: typeof fn === 'function' ? fn(s.edges) : fn })),
  selectNode: (n) => set({ selected: n }),
  history: [],
  historyIndex: -1,
  pushHistory: () => {
    const snapshot = { nodes: get().nodes, edges: get().edges }
    const h = get().history.slice(0, get().historyIndex + 1)
    h.push(snapshot)
    set({ history: h, historyIndex: h.length - 1 })
  },
  undo: () => {
    const idx = get().historyIndex
    if (idx <= 0) return
    const prev = get().history[idx - 1]
    set({ nodes: prev.nodes, edges: prev.edges, historyIndex: idx - 1 })
  },
  redo: () => {
    const idx = get().historyIndex
    if (idx >= get().history.length - 1) return
    const next = get().history[idx + 1]
    set({ nodes: next.nodes, edges: next.edges, historyIndex: idx + 1 })
  }
}))

export default useStore
