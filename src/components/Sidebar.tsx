// src/components/Sidebar.tsx
import React from 'react'
import useStore from '../stores/useStore'

export default function Sidebar() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-60 p-3 border-r bg-gray-50 flex flex-col">
      <h3 className="font-semibold mb-3">Palette</h3>

      <div className="space-y-2">
        <div
          draggable
          onDragStart={(e) => onDragStart(e, 'input')}
          className="p-2 border rounded bg-white cursor-grab"
        >
          Start
        </div>

        <div
          draggable
          onDragStart={(e) => onDragStart(e, 'default')}
          className="p-2 border rounded bg-white cursor-grab"
        >
          Task
        </div>

        <div
          draggable
          onDragStart={(e) => onDragStart(e, 'automated')}
          className="p-2 border rounded bg-white cursor-grab"
        >
          Automated
        </div>

        <div
          draggable
          onDragStart={(e) => onDragStart(e, 'output')}
          className="p-2 border rounded bg-white cursor-grab"
        >
          End
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            const id = String(Date.now())
            ;(useStore as any).getState().setNodes((nds:any) => [
              ...nds,
              {
                id,
                type: 'custom',
                position: { x: 300 + Math.floor(Math.random()*40), y: 180 + Math.floor(Math.random()*40) },
                data: {
                  id,
                  label: 'Automated',
                  type: 'automated',
                  action: 'send-email',
                  params: { to: 'test@example.com' }
                }
              }
            ])
          }}
          className="mt-3 w-full px-3 py-2 rounded bg-indigo-600 text-white"
        >
          Add Automated Node (default)
        </button>
      </div>
    </aside>
  )
}
