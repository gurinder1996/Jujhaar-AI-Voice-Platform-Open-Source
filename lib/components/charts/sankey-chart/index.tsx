"use client"

import { ResponsiveContainer, Sankey, Tooltip, Layer } from "recharts"
import { NodeRenderer } from "./node-renderer"
import { LinkRenderer } from "./link-renderer"
import { CustomTooltip } from "./tooltip"
import type { SankeyChartProps } from "./types"

export function SankeyChart({ data, height = 400 }: SankeyChartProps) {
  if (!data?.nodes?.length || !data?.links?.length) {
    return (
      <div className="flex h-[400px] items-center justify-center text-muted-foreground">
        No data available
      </div>
    )
  }

  // Transform data to use numeric indices for source/target
  const nodeMap = new Map(data.nodes.map((node, i) => [node.id, i]))
  
  const sankeyData = {
    nodes: data.nodes,
    links: data.links.map(link => ({
      source: typeof link.source === 'string' ? nodeMap.get(link.source) : link.source,
      target: typeof link.target === 'string' ? nodeMap.get(link.target) : link.target,
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
          node={NodeRenderer}
          link={LinkRenderer}
        >
          <Tooltip content={CustomTooltip} />
          <Layer />
        </Sankey>
      </ResponsiveContainer>
    </div>
  )
}