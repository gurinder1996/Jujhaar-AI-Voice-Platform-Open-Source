"use client"

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { chartColors } from "./config"
import type { ChartProps } from "./types"

interface PieChartProps extends ChartProps {
  innerRadius?: number
  outerRadius?: number
}

export function PieChart({
  data,
  height = 120,
  innerRadius = 35,
  outerRadius = 50
}: PieChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={chartColors[entry.name.toLowerCase() as keyof typeof chartColors]} 
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}