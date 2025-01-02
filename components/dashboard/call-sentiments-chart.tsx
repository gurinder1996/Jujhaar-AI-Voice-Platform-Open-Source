"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts"
import { callSentimentsData } from "@/lib/data/dashboard/call-sentiments"

export function CallSentimentsChart() {
  if (!callSentimentsData?.length) {
    return (
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium">Call Sentiments</h3>
          <p className="text-xs text-muted-foreground">The sentiment as based on users responses</p>
        </div>
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </Card>
    )
  }

  const data = callSentimentsData.map(({ sentiment, percentage }) => ({
    subject: sentiment,
    value: percentage,
    fullMark: 100
  }))

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Call Sentiments</h3>
        <p className="text-xs text-muted-foreground">The sentiment as based on users responses</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Sentiment"
              dataKey="value"
              stroke="#E6007A"
              fill="#E6007A"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}