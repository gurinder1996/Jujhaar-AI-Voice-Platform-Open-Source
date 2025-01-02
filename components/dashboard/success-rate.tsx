"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts"
import { successRateData } from "@/lib/data/dashboard/success-rate"

export function SuccessRate() {
  if (!successRateData) {
    return (
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium">Success Rate</h3>
          <p className="text-xs text-muted-foreground">
            How often Phonely was able to resolve your calls completely
          </p>
        </div>
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </Card>
    )
  }

  const total = successRateData.success + successRateData.failure + successRateData.unsure
  const data = [
    {
      name: "Success",
      value: (successRateData.success / total) * 100,
      fill: "#4CAF50"
    },
    {
      name: "Failure",
      value: (successRateData.failure / total) * 100,
      fill: "#F44336"
    },
    {
      name: "Unsure",
      value: (successRateData.unsure / total) * 100,
      fill: "#9E9E9E"
    }
  ]

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium">Success Rate</h3>
        <p className="text-xs text-muted-foreground">
          How often Phonely was able to resolve your calls completely
        </p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="30%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise={true}
              dataKey="value"
              cornerRadius={10}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}