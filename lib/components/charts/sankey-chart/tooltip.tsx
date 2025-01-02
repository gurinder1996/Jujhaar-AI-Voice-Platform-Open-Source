"use client"

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    payload: {
      name: string
      value: number
      sourceNode?: { name: string }
      targetNode?: { name: string }
    }
  }>
}

export function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null

  const data = payload[0].payload

  return (
    <div className="rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5">
      <div className="space-y-1.5">
        <p className="font-medium">{data.name}</p>
        {data.sourceNode && data.targetNode && (
          <p className="text-sm text-muted-foreground">
            {data.sourceNode.name} → {data.targetNode.name}
          </p>
        )}
        <p className="text-sm font-medium">
          Volume: {data.value}
        </p>
      </div>
    </div>
  )
}