"use client"

import { nodeColors } from "./theme"
import type { LinkRendererProps } from "./types"

export function LinkRenderer({ sourceX, sourceY, targetX, targetY, payload, sourceControlX, targetControlX, linkWidth }: LinkRendererProps) {
  return (
    <path
      d={`
        M${sourceX},${sourceY}
        C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
      `}
      fill="none"
      stroke={nodeColors[payload.sourceNode.id] || "#E6007A"}
      strokeWidth={linkWidth}
      strokeOpacity={0.3}
    />
  )
}