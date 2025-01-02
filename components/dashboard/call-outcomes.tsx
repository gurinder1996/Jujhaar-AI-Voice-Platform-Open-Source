"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, Line } from "recharts"
import { callOutcomesData } from "@/lib/data/dashboard/call-outcomes"

export function CallOutcomes() {
  if (!callOutcomesData?.length) {
    return (
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium">Call Outcomes</h3>
          <p className="text-xs text-muted-foreground">Top outcomes based on users intent</p>
        </div>
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </Card>
    )
  }

  // Calculate running total for the line
  let total = 0
  const data = callOutcomesData.map(({ outcome, count }) => {
    total += count
    return {
      name: outcome,
      count: count,
      total: total
    }
  })

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Call Outcomes</h3>
        <p className="text-xs text-muted-foreground">Top outcomes based on users intent</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar 
              yAxisId="left"
              dataKey="count" 
              fill="#4A1D96" 
              radius={[4, 4, 0, 0]} 
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="total"
              stroke="#E6007A"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}