"use client"

import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"
import { useAgentField } from "@/hooks/use-agent-field"
import { useParams } from "next/navigation"
import { useCallback } from "react"

export function AgentGuidelines() {
  const { agentId } = useParams()
  const {
    value,
    error,
    isUpdating,
    onChange,
    onBlur
  } = useAgentField(
    agentId as string,
    ['guidelines'],
    'guidelines',
    ''
  )

  // Debounce the onChange to prevent rapid state updates
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <h3 className="text-lg font-medium">Agent Guidelines</h3>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">
        Set general guidelines for your agent that will be applied across all workflows.
      </p>
      <div className="space-y-2">
        <Textarea
          placeholder="Enter guidelines for how your agent should behave..."
          className="min-h-[150px] resize-none"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={isUpdating}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}