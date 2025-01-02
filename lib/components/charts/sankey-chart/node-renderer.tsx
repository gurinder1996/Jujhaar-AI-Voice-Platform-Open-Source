"use client"

import { Rectangle } from "recharts"
import { nodeColors } from "./theme"
import type { NodeRendererProps } from "./types"

export function NodeRenderer({ x, y, width, height, payload }: NodeRendererProps) {
  const isRightSide = x > 400
  const textX = isRightSide ? x - 6 : x + width + 6
  const textAnchor = isRightSide ? "end" : "start"

  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={nodeColors[payload.id] || "#E6007A"}
        fillOpacity={0.9}
        rx={4}
      />
      <text
        x={textX}
        y={y + height / 2}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        className="text-xs font-medium fill-current"
      >
        {payload.name}
      </text>
    </g>
  )
}