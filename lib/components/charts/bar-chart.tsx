"use client"

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { chartColors, createAxisProps } from "./config"
import type { ChartProps } from "./types"

interface BarChartProps extends ChartProps {
  layout?: "horizontal" | "vertical"
  labelKey?: string
  valueKey?: string
  color?: keyof typeof chartColors
}

export function BarChart({
  data,
  height = 200,
  layout = "vertical",
  labelKey = "label",
  valueKey = "value",
  color = "primary"
}: BarChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} layout={layout}>
          <XAxis 
            {...(layout === "vertical" 
              ? { type: "number" } 
              : { type: "category", dataKey: labelKey }
            )}
            tickLine={false}
            axisLine={true}
            fontSize={12}
          />
          <YAxis 
            {...(layout === "vertical"
              ? { type: "category", dataKey: labelKey, width: 150 }
              : { type: "number" }
            )}
            tickLine={false}
            axisLine={true}
            fontSize={12}
          />
          <Tooltip />
          <Bar 
            dataKey={valueKey} 
            fill={chartColors[color]} 
            radius={layout === "vertical" ? [0, 4, 4, 0] : [4, 4, 0, 0]} 
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}