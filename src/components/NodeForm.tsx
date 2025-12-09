import React, { useEffect, useState } from 'react'
import useStore from '../stores/useStore'
import { getAutomations } from '../api/client'

export default function NodeForm(): JSX.Element {
  const selected = useStore(s => s.selected)
  const setNodes = useStore(s => s.setNodes)
  const [label, setLabel] = useState('')
  const [nodeType, setNodeType] = useState('default')
  const [automations, setAutomations] = useState<any[]>([])
  const [selectedAction, setSelectedAction] = useState('')
  const [params, setParams] = useState<Record<string, any>>({})

  // sync UI when selection changes
  useEffect(()=> {
    if (!selected) return
    setLabel(selected.data?.label ?? selected.data?.id ?? '')
    setNodeType(selected.data?.type ?? selected.type ?? 'default')
    setSelectedAction(selected.data?.action ?? '')
    setParams(selected.data?.params ?? {})
    // load automations if the node is automated
    if ((selected.data?.type ?? selected.type) === 'automated') {
      getAutomations().then(setAutomations).catch(()=>setAutomations([]))
    } else {
      setAutomations([])
    }
  }, [selected])

  // when the nodeType changes in UI, load automations if needed and clear action/params
  useEffect(() => {
    if (nodeType === 'automated') {
      getAutomations().then(setAutomations).catch(()=>setAutomations([]))
    } else {
      setSelectedAction('')
      setParams({})
      setAutomations([])
    }
  }, [nodeType])

  if (!selected) return <div className="p-2 text-sm text-gray-600">Select a node to edit</div>

  const save = () => {
    setNodes((nds:any) => nds.map((n:any) => {
      if (n.id !== selected.id) return n
      const newData = { ...n.data, label, type: nodeType, action: selectedAction, params }
      return { ...n, data: newData, type: 'custom' }
    }))
  }

  const onParamChange = (key: string, value: any) => {
    setParams(p => ({ ...p, [key]: value }))
  }

  const selectedActionDef = automations.find(a => a.id === selectedAction)

  return (
    <div className="mb-4">
      <h4 className="font-semibold">Edit Node</h4>

      <div className="mt-2">
        <label className="text-xs text-gray-600">Label</label>
        <input className="w-full border p-1 rounded" value={label} onChange={(e)=>setLabel(e.target.value)} />
      </div>

      <div className="mt-2">
        <label className="text-xs text-gray-600">Type</label>
        <select className="w-full border p-1 rounded" value={nodeType} onChange={(e)=>setNodeType(e.target.value)}>
          <option value="input">Start (input)</option>
          <option value="default">Task (default)</option>
          <option value="automated">Automated</option>
          <option value="output">End (output)</option>
        </select>
      </div>

      {nodeType === 'automated' && (
        <div className="mt-2">
          <label className="text-xs text-gray-600">Action</label>
          <select className="w-full border p-1 rounded" value={selectedAction} onChange={(e)=>setSelectedAction(e.target.value)}>
            <option value="">-- choose --</option>
            {automations.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          {selectedActionDef && (
            <div className="mt-2">
              <h5 className="text-sm font-medium">Parameters</h5>
              <div className="space-y-2 mt-1">
                {selectedActionDef.params.map((p:any) => (
                  <div key={p.key}>
                    <label className="text-xs text-gray-600">{p.key}{p.required ? ' *' : ''}</label>
                    <input
                      className="w-full border p-1 rounded"
                      value={params[p.key] ?? ''}
                      onChange={(e)=>onParamChange(p.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button onClick={save} className="px-3 py-1 rounded bg-green-600 text-white">Save</button>
      </div>

      <div className="mt-2 text-xs text-gray-500">Node id: {selected.id}</div>
    </div>
  )
}
