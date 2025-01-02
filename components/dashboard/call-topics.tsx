"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from "recharts"
import { callTopicsData } from "@/lib/data/dashboard/call-topics"

const COLORS = ['#E6007A', '#4A1D96', '#FF9999', '#66B2FF', '#90EE90']

export function CallTopics() {
  if (!callTopicsData?.length) {
    return (
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium">Call Topics</h3>
          <p className="text-xs text-muted-foreground">Topic of call based on users intent</p>
        </div>
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </Card>
    )
  }

  // Transform data for RadialBarChart
  const total = callTopicsData.reduce((acc, curr) => acc + curr.count, 0)
  const data = callTopicsData.map((item, index) => ({
    name: item.topic,
    value: (item.count / total) * 100,
    count: item.count,
    fill: COLORS[index % COLORS.length]
  }))

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Call Topics</h3>
        <p className="text-xs text-muted-foreground">Topic of call based on users intent</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="30%"
            outerRadius="100%"
            data={data}
            startAngle={0}
            endAngle={360}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise={true}
              dataKey="value"
              cornerRadius={10}
            />
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null
                const data = payload[0].payload
                return (
                  <div className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/5">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.count} calls ({data.value.toFixed(1)}%)
                    </p>
                  </div>
                )
              }}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                fontSize: '12px'
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}