"use client"

import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"

export function AgentGuidelines() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <h3 className="text-lg font-medium">Agent Guidelines</h3>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">
        Set general guidelines for your agent that will be applied across all workflows.
      </p>
      <Textarea
        placeholder="Enter guidelines for how your agent should behave..."
        className="min-h-[150px] resize-none"
      />
    </div>
  )
}