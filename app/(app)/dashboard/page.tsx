"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { CallVolumeChart } from "@/components/dashboard/call-volume-chart"
import { EndCallReasons } from "@/components/dashboard/end-call-reasons"
import { CallSentimentsChart } from "@/components/dashboard/call-sentiments-chart"
import { PeakTimesChart } from "@/components/dashboard/peak-times-chart"
import { CallTopics } from "@/components/dashboard/call-topics"
import { SuccessRate } from "@/components/dashboard/success-rate"
import { AgentsBreakdown } from "@/components/dashboard/agents-breakdown"
import { CallOutcomes } from "@/components/dashboard/call-outcomes"
import { CallActions } from "@/components/dashboard/call-actions"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          title="Duration"
          value="0.00"
          subtitle="No previous data available"
          icon="duration"
        />
        <StatsCard
          title="Inbound"
          value="0"
          subtitle="No previous data available"
          icon="inbound"
        />
        <StatsCard
          title="Outbound"
          value="0"
          subtitle="No previous data available"
          icon="outbound"
        />
        <StatsCard
          title="Tasks"
          value="0"
          subtitle="No previous data available"
          icon="tasks"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <CallVolumeChart />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CallSentimentsChart />
        <PeakTimesChart />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CallTopics />
        <SuccessRate />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AgentsBreakdown />
        <CallOutcomes />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <CallActions />
      </div>
    </div>
  )
}
