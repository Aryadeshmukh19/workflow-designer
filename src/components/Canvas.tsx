// src/components/Canvas.tsx  (full file replacement)
import React, { useCallback, useRef, useState, useEffect, JSX } from 'react'
import ReactFlow, {
  addEdge, Background, Controls, Edge, Node, ReactFlowProvider,
  useReactFlow, MiniMap
} from 'reactflow'
import useStore from '../stores/useStore'
import CustomNode from './CustomNode'

const nodeTypes = { custom: CustomNode }

export default function Canvas(): JSX.Element {
  return (
    <div className="flex-1 bg-white h-full">
      <ReactFlowProvider>
        <FlowInner />
      </ReactFlowProvider>
    </div>
  )
}

function FlowInner() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
  const nodes = useStore(state => state.nodes)
  const edges = useStore(state => state.edges)
  const setNodes = useStore(state => state.setNodes)
  const setEdges = useStore(state => state.setEdges)
  const selectNode = useStore(s => s.selectNode)
  const pushHistory = useStore(s => s.pushHistory)
  const undo = useStore(s => s.undo)
  const redo = useStore(s => s.redo)
  const rf = useReactFlow()
  const [recentNodeId, setRecentNodeId] = useState<string | null>(null)

  useEffect(()=> {
    if (!recentNodeId) return
    const t = setTimeout(()=> setRecentNodeId(null), 900)
    return ()=> clearTimeout(t)
  }, [recentNodeId])

  const onConnect = useCallback((params: Edge | any) => {
    setEdges((eds: Edge[]) => {
      const next = addEdge(params, eds)
      pushHistory()
      return next
    })
  }, [setEdges, pushHistory])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const reactFlowNodeType = event.dataTransfer.getData('application/reactflow')
    if (!reactFlowNodeType) return
    const wrapper = reactFlowWrapper.current
    if (!wrapper) return
    const bounds = wrapper.getBoundingClientRect()
    const position = rf.project({ x: event.clientX - bounds.left, y: event.clientY - bounds.top })
    const id = String(Date.now())
    const newNode: Node = {
      id,
      type: 'custom',
      position,
      data: { id, label: reactFlowNodeType.toUpperCase(), type: reactFlowNodeType }
    }
    pushHistory()
    setNodes((nds:any) => {
      setRecentNodeId(id)
      return [...nds, newNode]
    })
  }, [rf, setNodes, pushHistory])

  const onDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }, [])

  return (
    <div className="w-full h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        style={{ width: '100%', height: '100%' }}
        onNodeClick={(e, node)=>selectNode(node as any)}
        panOnScroll
        panOnDrag
        zoomOnScroll
        minZoom={0.3}
        maxZoom={1.6}
        defaultZoom={1}
        snapToGrid={false}
      >
        <Background gap={16} size={1} color="#e6e6e6" />
        <MiniMap nodeColor={(n)=> n.data?.type==='automated' ? '#7c3aed' : '#6b7280'} />
        <Controls showInteractive={false} />
        <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 4 }}>
          <button onClick={undo} className="mr-2 px-2 py-1 bg-gray-200 rounded">Undo</button>
          <button onClick={redo} className="px-2 py-1 bg-gray-200 rounded">Redo</button>
        </div>
      </ReactFlow>
    </div>
  )
}
