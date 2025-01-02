"use client"

import { Card } from "@/components/ui/card"
import { Clock, Phone, CheckSquare } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: "duration" | "inbound" | "outbound" | "tasks"
}

export function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  const Icon = {
    duration: Clock,
    inbound: Phone,
    outbound: Phone,
    tasks: CheckSquare
  }[icon]

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {title}
            <Icon className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </Card>
  )
}