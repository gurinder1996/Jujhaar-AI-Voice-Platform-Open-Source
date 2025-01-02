"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

const data = [
  { date: "Dec 24", inbound: 2, outbound: 1 },
  { date: "Dec 25", inbound: 3, outbound: 2 },
  { date: "Dec 26", inbound: 1, outbound: 3 },
  { date: "Dec 27", inbound: 4, outbound: 2 },
  { date: "Dec 28", inbound: 2, outbound: 1 },
  { date: "Dec 29", inbound: 3, outbound: 2 },
  { date: "Dec 30", inbound: 2, outbound: 3 },
  { date: "Dec 31", inbound: 5, outbound: 1 },
]

export function CallVolumeChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Call Volume</h3>
        <p className="text-xs text-muted-foreground">Calls received and made by Voice AI Daddy</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="inbound" 
              stroke="#E6007A" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="outbound" 
              stroke="#4A1D96" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}