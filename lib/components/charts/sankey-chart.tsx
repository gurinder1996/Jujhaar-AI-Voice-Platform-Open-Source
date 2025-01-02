"use client"

import { Sankey, Tooltip, Rectangle, Layer } from "recharts"
import { ResponsiveContainer } from "recharts"

const nodeColors: { [key: string]: string } = {
  greeting: "#87CEEB",
  appointment: "#FF9999",
  product: "#66B2FF",
  misc: "#FFB366",
  assistance: "#90EE90",
  close: "#98FB98",
  success: "#90EE90",
  failure: "#FFB366"
}

interface SankeyProps {
  data: {
    nodes: Array<{
      name: string
      id: string
    }>
    links: Array<{
      source: number
      target: number
      value: number
    }>
  }
  height?: number
}

export function SankeyChart({ data, height = 400 }: SankeyProps) {
  // Transform data to use numeric indices for source/target
  const nodeMap = new Map(data.nodes.map((node, i) => [node.id, i]))
  
  const sankeyData = {
    nodes: data.nodes,
    links: data.links.map(link => ({
      source: nodeMap.get(link.source),
      target: nodeMap.get(link.target),
      value: link.value
    }))
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={sankeyData}
          nodeWidth={20}
          nodePadding={50}
          iterations={32}
          link={{ stroke: "#ddd" }}
          node={({ payload }) => (
            <Rectangle
              fill={nodeColors[payload.id] || "#E6007A"}
              radius={[4, 4, 4, 4]}
            />
          )}
        >
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null
              const data = payload[0].payload
              return (
                <div className="rounded-lg bg-white p-2 shadow-lg">
                  <p className="font-medium">{data.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Volume: {data.value}
                  </p>
                </div>
              )
            }}
          />
          <Layer />
        </Sankey>
      </ResponsiveContainer>
    </div>
  )
}