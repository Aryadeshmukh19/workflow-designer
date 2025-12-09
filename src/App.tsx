// src/App.tsx
import React, { JSX } from 'react'
import Canvas from './components/Canvas'
import NodeForm from './components/NodeForm'
import useStore from './stores/useStore'
import { simulateWorkflow } from './api/client'

function SidebarInline() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="left-panel w-64 p-4 border-r">
      <h3 className="text-lg font-semibold mb-3">Palette</h3>

      <div className="space-y-3">
        <div className="palette-item p-2 rounded-md bg-white border cursor-grab" draggable onDragStart={(e)=>onDragStart(e,'input')}>
          <div className="text-sm font-medium">Start</div>
          <div className="small-muted">Begin flow</div>
        </div>

        <div className="palette-item p-2 rounded-md bg-white border cursor-grab" draggable onDragStart={(e)=>onDragStart(e,'default')}>
          <div className="text-sm font-medium">Task</div>
          <div className="small-muted">Human task</div>
        </div>

        <div className="palette-item p-2 rounded-md bg-white border cursor-grab" draggable onDragStart={(e)=>onDragStart(e,'automated')}>
          <div className="text-sm font-medium">Automated</div>
          <div className="small-muted">Run automation</div>
        </div>

        <div className="palette-item p-2 rounded-md bg-white border cursor-grab" draggable onDragStart={(e)=>onDragStart(e,'output')}>
          <div className="text-sm font-medium">End</div>
          <div className="small-muted">Finish</div>
        </div>

        <div className="mt-4">
          <button className="btn btn-primary w-full" onClick={()=>{
            const id = String(Date.now())
            ;(useStore as any).getState().setNodes((nds:any)=>[
              ...nds,
              { id, type:'custom', position:{x:300,y:180}, data:{ id, label:'Automated', type:'automated', action:'send-email', params:{ to:'test@example.com' } } }
            ])
          }}>Add Automated Node</button>
        </div>
      </div>
    </aside>
  )
}

export default function App(): JSX.Element {
  const nodes = useStore(s=>s.nodes)
  const edges = useStore(s=>s.edges)

  const runSimulation = async () => {
    try {
      const resp = await simulateWorkflow({ nodes, edges })
      alert(JSON.stringify(resp, null, 2))
    } catch (e:any) {
      alert('Simulation failed: ' + (e?.message||String(e)))
    }
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({nodes,edges},null,2)], { type:'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'workflow.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="app-header">
        <div className="app-title">Workflow Designer — Frontend Internship Demo</div>
        <div style={{flex:1}} />
        <div className="text-sm small-muted">Demo build</div>
      </header>

      <div className="flex flex-1">
        <SidebarInline />
        <main className="flex-1 p-3">
          <div className="h-full bg-white rounded-md shadow-sm overflow-hidden">
            <Canvas />
          </div>
        </main>

        <aside className="right-panel w-80 p-4">
          <div className="mb-3">
            <h4 className="font-semibold">Inspector</h4>
            <div className="small-muted text-sm">Select a node to edit properties</div>
          </div>

          <div className="overflow-auto mb-4" style={{maxHeight:'calc(100vh - 220px)'}}>
            <NodeForm />
          </div>

          <div className="mt-auto">
            <div className="flex gap-2 mb-3">
              <button className="btn btn-primary flex-1" onClick={runSimulation}>Run Simulation</button>
              <button className="btn btn-plain" onClick={exportJSON}>Export</button>
            </div>
            <div className="text-xs small-muted">Import via file in main app (top-right)</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
