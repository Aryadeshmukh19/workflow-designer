// src/components/CustomNode.tsx
import React from 'react'
import { Handle, Position } from 'reactflow'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const cardVariants = {
  initial: { opacity: 0, y: 6, scale: 0.995 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: 'circOut' } },
  hover: { y: -3, boxShadow: '0 12px 30px rgba(2,6,23,0.10)' },
  selected: { y: -6, boxShadow: '0 18px 40px rgba(2,6,23,0.14)' },
}

export default function CustomNode({ data, selected }: any) {
  const label = data?.label ?? 'Node'
  const subtype = data?.type ?? 'task'
  const action = data?.action

  return (
    <motion.div
      initial="initial"
      animate="enter"
      whileHover="hover"
      variants={cardVariants}
      // keep layout so position changes animate slightly
      layout
    >
      <div className={`node-card ${selected ? 'node-selected' : ''}`} style={{ overflow: 'visible' }}>
        <div className="flex items-start gap-3">
          <div className="flex-none w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Zap size={16} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{label}</div>
            <div className="subtitle mt-0.5 truncate">{subtype}</div>
          </div>

          {action && (
            <div className="ml-2 self-start">
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">{action}</span>
            </div>
          )}
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  )
}
