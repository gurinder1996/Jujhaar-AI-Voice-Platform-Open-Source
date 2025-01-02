"use client"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart } from "@/lib/components/charts/pie-chart"
import { agentsBreakdownData } from "@/lib/data/dashboard"

export function AgentsBreakdown() {
  if (!agentsBreakdownData?.length) {
    return (
      <Card className="p-6">
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </Card>
    )
  }

  const data = agentsBreakdownData.map(({ name, calls }) => ({
    name,
    value: calls
  }))

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Agents Breakdown</h3>
          <p className="text-xs text-muted-foreground">
            Distribution of calls handled by each agent
          </p>
        </div>
        <Select defaultValue="inbound">
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <PieChart 
        data={data} 
        height={200}
        innerRadius={60}
        outerRadius={80}
      />
      
      <div className="mt-4 flex justify-center gap-4">
        {data.map(({ name, value }) => (
          <div key={name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm">{name} ({value})</span>
          </div>
        ))}
      </div>
    </Card>
  )
}