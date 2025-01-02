export interface SankeyNode {
  name: string
  id: string
  value: number
}

export interface SankeyLink {
  source: string | number
  target: string | number
  value: number
  sourceNode?: SankeyNode
  targetNode?: SankeyNode
}

export interface SankeyData {
  nodes: SankeyNode[]
  links: SankeyLink[]
}

export interface SankeyChartProps {
  data: SankeyData
  height?: number
}

export interface NodeRendererProps {
  x: number
  y: number
  width: number
  height: number
  payload: SankeyNode
}

export interface LinkRendererProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourceControlX: number
  targetControlX: number
  linkWidth: number
  payload: {
    sourceNode: SankeyNode
    targetNode: SankeyNode
  }
}