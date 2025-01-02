"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

const data = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  calls: Math.floor(Math.random() * 4)
}))

export function PeakTimesChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Peak Times</h3>
        <p className="text-xs text-muted-foreground">Hours during the day that users are calling most</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="hour" fontSize={12} tickLine={false} interval={2} />
            <YAxis fontSize={12} tickLine={false} />
            <Bar dataKey="calls" fill="#E6007A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}