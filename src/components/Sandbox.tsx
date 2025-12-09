import React from 'react'
import { simulateWorkflow } from '../api/client'
import { serializeGraph } from '../utils/serialize'

export default function Sandbox(): JSX.Element {
  const run = async () => {
    const payload = serializeGraph()
    const res = await simulateWorkflow(payload)
    alert('Simulation result: ' + JSON.stringify(res.steps))
  }

  const exportJSON = () => {
    const payload = serializeGraph()
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'workflow.json'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Sandbox</h4>
      <button onClick={run} className="mt-2 mr-2 px-3 py-1 rounded bg-blue-600 text-white">Run Simulation</button>
      <button onClick={exportJSON} className="mt-2 px-3 py-1 rounded bg-gray-200">Export JSON</button>
    </div>
  )
}
