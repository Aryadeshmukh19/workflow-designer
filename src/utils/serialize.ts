import useStore from '../stores/useStore'

export function serializeGraph() {
  const nodes = useStore.getState().nodes
  const edges = useStore.getState().edges
  return { nodes, edges }
}
